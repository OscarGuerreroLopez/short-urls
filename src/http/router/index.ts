import { Router } from "express";

import addUrl from "./addUrl";

const router = Router();

// routes
router.use("/", addUrl);

export default router as Router;
