"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const dbConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};
exports.default = dbConfig;
