"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const api_1 = __importDefault(require("./api"));
const cors_1 = __importDefault(require("cors"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const LoginController_1 = __importDefault(require("./controllers/LoginController"));
data_source_1.AppDataSource.initialize().then(() => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "https://include-code-front-end.vercel.app");
        app.use((0, cors_1.default)());
        next();
    });
    app.post('/user', UserController_1.default.create);
    app.post('/login', LoginController_1.default.login);
    app.get('/hello', (req, res) => {
        res.send("Hello World");
    });
    app.use(api_1.default);
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`server is started in http://localhost:${process.env.SERVER_PORT}`);
    });
});
