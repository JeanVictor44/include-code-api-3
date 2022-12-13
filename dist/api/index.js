"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LoginController_1 = __importDefault(require("../controllers/LoginController"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const routes = (0, express_1.Router)();
routes.post('/user', UserController_1.default.create);
routes.post('/login', LoginController_1.default.login);
routes.get('/hello', (req, res) => {
    res.send("Hello World");
});
exports.default = routes;
