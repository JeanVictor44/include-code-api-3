"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.port = void 0;
require('dotenv').config();
const typeorm_1 = require("typeorm");
exports.port = process.env.DB_PORT;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: exports.port,
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
