import express from "express";
import colors from "colors";
import morgan from "morgan";
import db from "./config/db";
import budgetRouter from "./routes/budgetRouter";


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

//Routes
app.use("/api/budgets", budgetRouter);

export default app;