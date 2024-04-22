import mysql from "mysql";
import dotenv from "dotenv";
import express from "express";


dotenv.config();
const DB_HOST = process.env.DBHOST
const DB_USER = process.env.DBUSER
const DB_PASSWORD = process.env.DBPASSWORD
const DB_DATABASE = process.env.DBNAME
const DB_PORT = process.env.DBPORT


const app = express();

const db = mysql.createPool({
    connectionLimit: 100,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
});
export default (app, db);