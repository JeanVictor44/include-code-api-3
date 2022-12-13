"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = require("../repositories/userRepository");
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            // verificar se o usuário existe
            // Caso exista verificar se a senha está correta7
            const user = yield userRepository_1.userRepository.findOneBy({ email });
            if (!user) {
                return res.status(400).json("E-mail ou senha inválidos");
            }
            const verifyPass = yield bcrypt_1.default.compare(password, user.password);
            if (!verifyPass) {
                return res.status(400).json("E-mail ou senha inválidos");
            }
            const jwtPass = process.env.JWT_PASS;
            // payload, password, expire
            const token = jsonwebtoken_1.default.sign({ id: user.id }, jwtPass, { expiresIn: "8h" });
            const { password: _ } = user, userLogin = __rest(user, ["password"]);
            return res.json({
                user: userLogin,
                token,
            });
        });
    }
}
exports.default = new LoginController();
