import cron from "node-cron";
import Task from "../models/task.model";

const createRecurringTasks = async () => {
  const tasks = await Task.find({
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

    await Task.create({
      title: task.title,
      description: task.description,
      dueDate: newDueDate,
      recurrence: task.recurrence,
    });
  });
};

cron.schedule("0 0 * * *", createRecurringTasks);
