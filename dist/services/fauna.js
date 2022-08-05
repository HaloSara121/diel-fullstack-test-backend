"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fauna = void 0;
require('dotenv').config();
const faunadb_1 = require("faunadb");
exports.fauna = new faunadb_1.Client({
    secret: String(process.env.FAUNA_SECRET_KEY)
});
