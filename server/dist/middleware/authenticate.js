"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const secretKey = process.env.SECRET_KEY || "myseceretkey";
const authenticate = async (req, res, next) => {
    try {
        if (req.url === "/api/v1/auth/login" ||
            req.url === "/api/v1/auth/register") {
            return next();
        }
        let token = req.headers.authorization;
        if (!token && token?.split(" ")[0] !== "Bearer") {
            return res.status(401).json({ message: "Please provide a valid token" });
        }
        jsonwebtoken_1.default.verify(token?.split(" ")[1], secretKey, async (err, user) => {
            if (err) {
                return res.status(403).json({ error: err, message: err.message });
            }
            if (user) {
                const user_info = await user_model_1.default.findOne({ username: user.username });
                // @ts-ignore
                req.user = user_info;
            }
            next();
        });
    }
    catch (error) { }
};
exports.authenticate = authenticate;
