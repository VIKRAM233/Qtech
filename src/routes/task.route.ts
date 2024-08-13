import express from "express";
import { createTask, deleteTask, readTask, updateTask } from "../controllers/task.controller";

const router = express.Router();

router.post("/", createTask);
router.get("/", readTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
