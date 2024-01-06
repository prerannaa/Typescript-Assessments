import { Router } from "express";

import { signup, login } from "../controllers/authController";
import { createUserSchema } from "../schema/user";
import { validateReqBody } from "../middleware/validator";

const router = Router();

router.post("/signup", validateReqBody(createUserSchema), signup);

router.post("/login", login);

router.get("/refresh");

export default router;
