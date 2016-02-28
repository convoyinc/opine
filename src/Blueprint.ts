import * as _path from 'path';

export default class Blueprint {

}

export function buildBlueprint(..._pathParts:string[]):typeof Blueprint {
  return class BuiltBlueprint extends Blueprint {

  };
}
