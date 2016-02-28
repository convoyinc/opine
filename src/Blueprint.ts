/**
 * Manages a logical grouping of configuration files and their behavior.
 *
 * A typical `Blueprint` is a set of files/templates, located in its
 * `sourceDir`, that are used to create or update corresponding files in the
 * destination project.
 *
 * While most authors will typically be declaring a subclass of
 * `BaseBlueprint`, the interface that opine directly depends on is hopefully
 * flexible enough to provide for custom implementations.
 */
export interface Blueprint {
  // Unfortunately, TypeScript doesn't appear to let us declare the signature
  // of the constructor.  So, pretend that it requires the following type:
  //
  //   constructor():void;
  //
  constructor:Function;
}

export default Blueprint;
