import { body } from "express-validator";

export const AddUrlValidator = [
  body("longUrl").exists().withMessage("missing url")
];
