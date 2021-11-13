// fake implementation of a db adapter, for example mongo
// with mongoose models. I used underscore to make it feel a bit closer to mongoose
// In a real app we would have some type of connection file
// separated and injectable so we can mock it easier and also easier to change
// databases without having to modify a lot of code, just this function

import _ from "underscore";

interface InstanceModel {
  find: <T>(where: Partial<T>) => T[];
  findOne: <T>(where: Partial<T>) => T;
  delete: <T>(where: Partial<T>) => boolean;
  updateOne: <T>(where: Partial<T>, values: IObjectLiteral) => T;
  insert: <T>(record: T) => boolean;
}

const dbInstancesModels: Map<string, Readonly<InstanceModel>> = new Map();

const userCollection: IObjectLiteral[] = [];
const apartmentCollection: IObjectLiteral[] = [];

export const DbAdapter = (): Database => {
  if (Array.from(dbInstancesModels.keys()).length === 0) {
    dbInstancesModels.set("urls", fakeModel(userCollection));
    dbInstancesModels.set("visits", fakeModel(apartmentCollection));
  }

  return {
    collection: (collection: string) => {
      const instanceModel = dbInstancesModels.get(collection);
      if (!instanceModel) {
        throw Error(`collection ${collection} not found in db`);
      }
      return instanceModel;
    }
  };
};

const fakeModel = <T>(collection: T[]): Readonly<InstanceModel> => {
  const methods = {
    find: (where: Partial<T>) => {
      const result = _.where(collection, where);

      return Object.assign([], result); // just to make sure noone alters the original value
    },
    findOne: (where: Partial<T>) => {
      const result = _.findWhere(collection, where);

      return Object.assign({}, result); // just to make sure noone alters the original value
    },
    insert: (record: T): boolean => {
      const newRecord: T[] = [record];

      collection = _.union(collection, newRecord);

      return true;
    },
    delete: (where: Partial<T>) => {
      const existingRecord = _.findWhere(collection, where) as T;

      if (!existingRecord) {
        return false;
      }

      collection = _.without(collection, existingRecord);

      return true;
    },
    updateOne: (where: Partial<T>, values: IObjectLiteral) => {
      let item = _.findWhere(collection, where) as T;

      item = { ...item, ...values };

      const result = _.extend(_.findWhere(collection, where), item);

      return result;
    }
  } as InstanceModel;

  return methods;
};
