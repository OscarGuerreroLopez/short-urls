import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AddUrlValidator } from "./validators";

import { AddUrl } from "../handlers";

const router = Router();

router.post("/", AddUrlValidator, asyncHandler(AddUrl));

export default router;
