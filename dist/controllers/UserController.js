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
const userRepository_1 = require("../repositories/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, lastName, isSocialName, email, age, ageNotInform, password } = req.body;
            // Validação de email, senha, lastName, name, caso idade seja 0 ou negativa o not inform = true, password validar quantidade de caracteres 
            const userExists = yield userRepository_1.userRepository.findOneBy({ email });
            if (userExists) {
                return res.status(400).json("E-mail já existe");
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 10); // Padrão 10
            const newUser = userRepository_1.userRepository.create({
                name,
                lastName,
                isSocialName,
                age,
                ageNotInform,
                email,
                password: hashPassword,
            });
            yield userRepository_1.userRepository.save(newUser);
            const { password: _ } = newUser, userData = __rest(newUser, ["password"]);
            return res.status(201).json(userData);
        });
    }
}
exports.default = new UserController();
