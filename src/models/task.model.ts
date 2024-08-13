import mongoose, { Document, Schema, Model, model } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  dueDate: Date;
  user_id: mongoose.Schema.Types.ObjectId;
  recurrence: "daily" | "weekly" | "monthly" | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema: Schema<ITask> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed"],
      default: "To Do",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    recurrence: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);

const Task: Model<ITask> = model<ITask>("Task", TaskSchema);

export default Task;
