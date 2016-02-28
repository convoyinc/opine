declare module 'validate-npm-package-name' {
  function validateNpmPackageName(name:string):validateNpmPackageName.Result;

  module validateNpmPackageName {

    export interface Result {
      // Whether the package name is valid in the current npm registry.
      validForNewPackages:boolean;
      // Whether the package name would be valid in the legacy npm registry.
      validForOldPackages:boolean;
      // Any human-readable warnings associated with the package name.
      warnings:string[];
      // Any human-readable errors associated with the package name.
      errors:string[];
    }

  }

  export = validateNpmPackageName;
}
