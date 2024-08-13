"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.readTask = exports.createTask = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        //   @ts-ignore
        const user_id = req.user._id;
        const task = new task_model_1.default({ title, description, status, dueDate, user_id });
        await task.save();
        return res
            .status(200)
            .json({ task, success: true, message: "Task created successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: error, message: error.message });
    }
};
exports.createTask = createTask;
const readTask = async (req, res) => {
    try {
        //   @ts-ignore
        const user_id = req.user._id;
        const tasks = await task_model_1.default.find({ user_id });
        return res
            .status(200)
            .json({ tasks, success: true, message: "Your tasks" });
    }
    catch (error) {
        return res.status(500).json({ error: error, message: error.message });
    }
};
exports.readTask = readTask;
const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, status, dueDate } = req.body;
        const updatedTask = { title, description, status, dueDate };
        const task = await task_model_1.default.findByIdAndUpdate(taskId, updatedTask, {
            new: true,
        });
        return res
            .status(200)
            .json({ task, success: true, message: "Task updated successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: error, message: error.message });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await task_model_1.default.findByIdAndDelete(taskId);
        return res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: error, message: error.message });
    }
};
exports.deleteTask = deleteTask;
