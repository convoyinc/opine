import * as path from 'path';

import Blueprint from './Blueprint';

/**
 * The standard `Blueprint` implementation, complete with many helpers.
 */
export default class BaseBlueprint implements Blueprint {

}

/**
 * A convenience method for constructing a `Blueprint` subclass and setting its
 * `sourceDir`.
 */
export function buildBlueprint(..._pathParts:string[]):BaseBlueprint {
  return class BuiltBlueprint extends BaseBlueprint {
    sourceDir:string = path.join(..._pathParts);
  };
}
