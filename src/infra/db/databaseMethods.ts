// the intention of this file is to provide the rest of the app with data retrieval methods
// the DB gets injected, so it is easier to mock for testing
// also, the rest of the application does not care where the data is coming from
// In this function I kind of mocked a mongoose way, but for example
// if we were to change databases we just have to touch 2 files
// the rest of the application will not be affected

export interface DatabaseMethodsRepo {
  remove: (collection: string, where: IObjectLiteral) => Promise<boolean>;
  find: <T>(collection: string, where?: IObjectLiteral) => Promise<T[]>;
  findOne: <T>(collection: string, where: IObjectLiteral) => Promise<T>;
  updateOne: <T>(
    collection: string,
    where: IObjectLiteral,
    values: IObjectLiteral
  ) => Promise<T>;
  insert: (collection: string, where: IObjectLiteral) => Promise<boolean>;
}

export const DatabaseMethods = (
  database: Database
): Readonly<DatabaseMethodsRepo> => {
  const remove = async (collection: string, where: IObjectLiteral) => {
    return await database.collection(collection).delete(where);
  };

  const insert = async (
    collection: string,
    record: IObjectLiteral
  ): Promise<boolean> => {
    return await database.collection(collection).insert(record);
  };

  const find = async <T>(
    collection: string,
    where: IObjectLiteral = {}
  ): Promise<T[]> => {
    return await database.collection(collection).find(where);
  };

  const findOne = async <T>(
    collection: string,
    where: IObjectLiteral
  ): Promise<T> => {
    return await database.collection(collection).findOne(where);
  };

  const updateOne = async (
    collection: string,
    where: IObjectLiteral = {},
    values: IObjectLiteral
  ) => {
    const updatedRecord = await database
      .collection(collection)
      .updateOne(where, values);

    return updatedRecord;
  };

  return { remove, find, updateOne, findOne, insert };
};
