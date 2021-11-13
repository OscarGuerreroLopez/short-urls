import {
  v4 as uuidv4,
  validate as uuidValidate,
  version as uuidVersion
} from "uuid";

export interface ID {
  makeId: () => string;
  isValidId: (uuid: string) => boolean;
}

export const Id: ID = {
  makeId: () => uuidv4(),
  isValidId: (uuid: string) => uuidValidate(uuid) && uuidVersion(uuid) === 4
};
