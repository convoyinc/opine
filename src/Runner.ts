import * as debug from 'debug';

const DEBUG = debug('opine:Runner');

export interface Options {
  blueprints?:string[];
  force?:boolean;
}

/**
 * Manages the process of applying blueprints to a project.
 */
export default class Runner {
  destination:string;
  options:Options;

  static async run(destination:string, options?:Options) {
    const runner = new this(destination, options);
    return await runner.run();
  }

  constructor(destination:string, options?:Options) {
    this.destination = destination;
    this.options     = options;
  }

  async run():Promise<void> {
    DEBUG('running');
    DEBUG('destination:', this.destination);
    DEBUG('options:    ', this.options);
  }

}
