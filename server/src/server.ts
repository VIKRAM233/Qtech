import express from "express";
import dotenv from "dotenv";
import { authenticate } from "./middleware/authenticate";

import authRoute from "./routes/auth.route";

dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/auth", authRoute);
app.use(authenticate);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});