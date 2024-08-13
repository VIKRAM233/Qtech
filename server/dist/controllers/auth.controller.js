"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const secretKey = process.env.SECRET_KEY || "myseceretkey";
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: "1h" });
}
const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = new user_model_1.default({ username: username, password: hashedPassword });
        await user.save();
        const token = generateToken({ username, hashedPassword });
        return res.status(200).json({ username, hashedPassword, token });
    }
    catch (error) {
        return res.status(500).json({ error: error, message: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        let { username, password } = req.body;
        const user = await user_model_1.default.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const hashedPassword = user.password;
        const isMatch = await bcrypt_1.default.compare(password, hashedPassword);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = generateToken({ username, hashedPassword });
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(500).json({ error: error, message: error.message });
    }
};
exports.login = login;
