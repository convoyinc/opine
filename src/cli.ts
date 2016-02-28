import * as chalk from 'chalk';
import * as meow from 'meow';
import * as debug from 'debug';

const DEBUG = debug('opine:cli');

const HELP = `
  ${chalk.dim(`Usage:`)} ${chalk.cyan('opine')} ${chalk.yellow(`[…options]`)} ${chalk.green(`[…BLUEPRINT]`)} ${chalk.blue(`DESTINATION`)}

  TL;DR:

    ${chalk.dim(`# Generate a new project in ${chalk.blue(`my-node-lib`)} with the blueprint ${chalk.green(`opine-node`)}.`)}
    ${chalk.dim(`$`)} ${chalk.cyan('opine')} ${chalk.green(`node`)} ${chalk.blue(`my-node-lib`)}

    ${chalk.dim(`# Update and apply blueprints in an existing project.`)}
    ${chalk.dim(`$`)} ${chalk.cyan('opine')} ${chalk.blue(`.`)}

  Positional arguments:

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

export function run(argv:string[]) {
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
}
