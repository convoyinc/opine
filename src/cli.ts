import * as _ from 'lodash';
import * as chalk from 'chalk';
import * as meow from 'meow';
import * as debug from 'debug';
import * as validateNpmPackageName from 'validate-npm-package-name';

import StacklessError from './StacklessError';
import Runner from './Runner';

const DEBUG = debug('opine:cli');

const HELP = `
  ${chalk.dim(`Usage:`)} ${chalk.cyan('opine')} ${chalk.yellow(`[…options]`)} ${chalk.green(`[…BLUEPRINT]`)} ${chalk.blue(`DESTINATION`)}

  TL;DR:

    ${chalk.dim(`# Generate a new project in ${chalk.blue(`my-node-lib`)} with the blueprint ${chalk.green(`opine-node`)}.`)}
    ${chalk.dim(`$`)} ${chalk.cyan('opine')} ${chalk.green(`node`)} ${chalk.blue(`my-node-lib`)}

    ${chalk.dim(`# Update and apply blueprints in an existing project.`)}
    ${chalk.dim(`$`)} ${chalk.cyan('opine')} ${chalk.blue(`.`)}

  Positional Arguments:

    ${chalk.green(`BLUEPRINT`)}:   A npm module containing an opine blueprint to apply to
                 ${chalk.blue(`DESTINATION`)}.  Multiple blueprints may be specified.
                 If ${chalk.blue(`DESTINATION`)} is an existing project, and no blueprints are
                 specified on the command line, the blueprints declared in its
                 package.json will be used.

    ${chalk.blue(`DESTINATION`)}: The directory to apply blueprints within.  If the directory
                 does not exist, it will be created, and a git repository will
                 be initialized within it.

  Options:

    ${chalk.yellow(`--force, -f`)}  Commits changes without prompting for a review.
`;

export async function run(argv:string[]) {
  let parsed:meow.Parsed;
  try {
    parsed = _parseArgv(argv);
    // We can't destructure when targeting node v4.
    const positional = parsed.input;
    const flags      = parsed.flags;

    const destination = _getDestination(positional);
    const blueprints  = _getBlueprints(positional);

    await Runner.run(destination, {
      blueprints,
      force: !!flags['force'],
    });
  } catch (error) {
    const message = error.hideStack ? error.message : error.stack;

    console.error();
    console.error(chalk.red(message));
    if (error.hideStack && parsed) {
      parsed.showHelp(1); // process.exit()s.
    } else {
      console.error();
    }

    throw error;
  }
}

function _parseArgv(argv:string[]):meow.Parsed {
  const result = meow(
    {
      argv,
      help: HELP,
      description: false,
    },
    {
      alias: {
        f: 'force',
      },
    }
  );
  DEBUG('parsed flags:', result.flags);
  DEBUG('parsed args: ', result.input);

  return result;
}

function _getDestination(positional:meow.ParsedValue[]):string {
  if (positional.length === 0) {
    throw new StacklessError(`You must specify a destination.`);
  }
  return String(_.last(positional));
}

function _getBlueprints(positional:meow.ParsedValue[]):string[] {
  const result = _.partition(_.slice(positional, 0, -1), _isValidPackage);
  if (result[1].length) {
    const prettyNames = result[1].map(n => `'${n}'`).join(', ');
    throw new StacklessError(`The following blueprints are not valid npm package name(s): ${prettyNames}`);
  }

  return result[0].map(String);
}

function _isValidPackage(name:string):boolean {
  return validateNpmPackageName(name).validForNewPackages;
}
