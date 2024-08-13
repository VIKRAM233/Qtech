import Task from "../models/task.model";
import { Request, Response } from "express";
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, dueDate, recurrence } = req.body;
    //   @ts-ignore
    const user_id = req.user._id;
    const task = new Task({ title, description, status, dueDate, user_id, recurrence });
    await task.save();
    return res
      .status(200)
      .json({ task, success: true, message: "Task created successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error, message: error.message });
  }
};

export const readTask = async (req: Request, res: Response) => {
  try {
    //   @ts-ignore
    const user_id = req.user._id;
    const tasks = await Task.find({ user_id });
    return res
      .status(200)
      .json({ tasks, success: true, message: "Your tasks" });
  } catch (error: any) {
    return res.status(500).json({ error: error, message: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const { title, description, status, dueDate, recurrence } = req.body;
    const updatedTask = { title, description, status, dueDate, recurrence };
    const task = await Task.findByIdAndUpdate(taskId, updatedTask, {
      new: true,
    });
    return res
      .status(200)
      .json({ task, success: true, message: "Task updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error, message: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndDelete(taskId);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error, message: error.message });
  }
};
