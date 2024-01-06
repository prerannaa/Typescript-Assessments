import { Router } from "express";

import authRoutes from "./authRoutes";
import userRoutes from "./UserRoutes";
// import todoRoutes from "./todoRoutes";
import { auth } from "../middleware/auth";

const router = Router();

router.use("/auth", authRoutes);

router.use("/users", auth, userRoutes);
router.use("/todos", );

export default router;
