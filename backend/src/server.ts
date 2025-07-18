import express from "express";
import morgan from "morgan";
import db from "./config/db";
import colors from "colors";

async function connectDB(){
    try {
        await db.authenticate();
        await db.sync();
        console.log(colors.green("Database connected"));
    } catch (error) {
        console.log(colors.red("Database connection error"), error);
    }
}

connectDB();

const app = express();

//Middleware
app.use(morgan("dev"));
app.use(express.json());


export default app;