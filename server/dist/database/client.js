"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Client {
    constructor() {
        this.connection = null;
    }
    static getInstance() {
        if (!Client.instance) {
            Client.instance = new Client();
        }
        return Client.instance;
    }
    async connect(uri) {
        if (!this.connection) {
            try {
                await mongoose_1.default.connect(uri);
                this.connection = mongoose_1.default.connection;
                console.log("Connected to MongoDB");
            }
            catch (error) {
                console.error("Error connecting to MongoDB:", error);
                throw error;
            }
        }
        return this.connection;
    }
    getConnection() {
        return this.connection;
    }
}
exports.default = Client;
