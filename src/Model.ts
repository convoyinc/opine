import * as _path from 'path';

export default class Model {

}

export function makeModel(..._pathParts:string[]):typeof Model {
  return class BuiltModel extends Model {

  };
}
