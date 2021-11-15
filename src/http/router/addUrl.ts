import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AddUrlValidator } from "./validators";

import { AddUrl } from "../handlers";
import { Proxy } from "../handlers/proxy";

const router = Router();

router.post("/", AddUrlValidator, asyncHandler(AddUrl));
router.get("/:id", asyncHandler(Proxy));

export default router;
