declare module 'meow' {
  import * as minimist from 'minimist';

  function meow(opts:meow.Options):meow.Parsed;
  function meow(help:string):meow.Parsed;
  function meow(opts:meow.Options, minimistOpts:minimist.Options):meow.Parsed;
  function meow(help:string, minimistOpts:minimist.Options):meow.Parsed;

  module meow {

    export interface Options {
      // A description to show above the help text.
      //
      // Set it to false to disable it altogether.
      description?:string|boolean;
      // The help text you want shown.
      //
      // The input is reindented and starting/ending newlines are trimmed which
      // means you can use a template literal without having to care about using
      // the correct amount of indent.
      help?:string;
      // Set a custom version output.
      //
      // Set it to false to disable it altogether.
      //
      // Defaults to the `version` property of `pkg`.
      version?:string;
      // Relative path to package.json or as an object.
      //
      // Defaults to the closest `package.json` upwards.
      pkg?:string|Object;
      // Custom arguments object.
      //
      // Defaults to `process.argv.slice(2)`.
      argv?:string[];
    }

    type ParsedValue = string|boolean|number;

    export interface Parsed {
      // Non-flag arguments.
      input:ParsedValue[];
      // Flags converted to camelCase.
      flags:{[key:string]:ParsedValue|ParsedValue[]};
      // The package.json object.
      pkg:Object;
      // The help text used with --help.
      help:Object;
      // Show the help text and exit with code.  Defaults to 0.
      showHelp(code?:number):void;
    }

  }

  export = meow;
}
