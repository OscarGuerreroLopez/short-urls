import { DbAdapter } from "./db";
import { DatabaseMethods } from "./databaseMethods";

const database: Database = DbAdapter();
export const DbMethods = DatabaseMethods(database);
