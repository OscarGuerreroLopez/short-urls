import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AddUrlValidator, ProxyValidator } from "./validators";
import { ValidatorMiddleware } from "../middleware";

import { AddUrl } from "../handlers";
import { Proxy } from "../handlers/proxy";

const router = Router();

router.post("/", AddUrlValidator, ValidatorMiddleware, asyncHandler(AddUrl));
router.get("/:id", ProxyValidator, ValidatorMiddleware, asyncHandler(Proxy));

export default router;
