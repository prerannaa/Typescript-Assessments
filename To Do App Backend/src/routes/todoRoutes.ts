import { Router } from "express";
import {createTask, updateTask, deleteTask} from "../controllers/todoController";
import { validateReqBody } from "../middleware/validator";
import { getTaskSchema } from "../schema/todo";


const router = Router();
router.post("/", validateReqBody(getTaskSchema), createTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);

export { router as TodoRoutes };