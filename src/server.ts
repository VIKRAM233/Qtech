import express from "express";
import dotenv from "dotenv";
import { authenticate } from "./middleware/authenticate";
import Client from "./database/client";
Client.getInstance().connect(process.env.MONGODB_URI || "mongodb://localhost:27017/TaskManagement");

import authRoute from "./routes/auth.route";
import taskRoute from "./routes/task.route";

dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(authenticate);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/task", taskRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});