"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authenticate_1 = require("./middleware/authenticate");
const client_1 = __importDefault(require("./database/client"));
client_1.default.getInstance().connect(process.env.MONGODB_URI || "mongodb://localhost:27017/TaskManagement");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const task_route_1 = __importDefault(require("./routes/task.route"));
dotenv_1.default.config({ path: "./.env" });
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json({ limit: "50mb" }));
app.use(authenticate_1.authenticate);
app.use("/api/v1/auth", auth_route_1.default);
app.use("/api/v1/task", task_route_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
