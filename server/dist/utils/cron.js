"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const task_model_1 = __importDefault(require("../models/task.model"));
const createRecurringTasks = async () => {
    const tasks = await task_model_1.default.find({
        recurrence: { $ne: null },
        dueDate: { $lte: new Date() },
    });
    tasks.forEach(async (task) => {
        let newDueDate;
        switch (task.recurrence) {
            case "daily":
                newDueDate = new Date(task.dueDate);
                newDueDate.setDate(newDueDate.getDate() + 1);
                break;
            case "weekly":
                newDueDate = new Date(task.dueDate);
                newDueDate.setDate(newDueDate.getDate() + 7);
                break;
            case "monthly":
                newDueDate = new Date(task.dueDate);
                newDueDate.setMonth(newDueDate.getMonth() + 1);
                break;
            default:
                return;
        }
        await task_model_1.default.create({
            title: task.title,
            description: task.description,
            dueDate: newDueDate,
            recurrence: task.recurrence,
        });
    });
};
node_cron_1.default.schedule("0 0 * * *", createRecurringTasks);
