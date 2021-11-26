import { body, param } from "express-validator";
import shortid from "shortid";

export const ValidateShortId = (value: string): boolean => {
  return shortid.isValid(value);
};

export const AddUrlValidator = [
  body("longUrl").exists().withMessage("missing url")
];

export const ProxyValidator = [
  param("id").custom((value) => {
    if (!ValidateShortId(value)) {
      throw new Error("Invalid short id");
    }

    return true;
  })
];
