// const express = require("express") use when type commonjs
import express from "express"
import dotenv from "dotenv"
import productRoutes from "./routes/products.js"
import { connectDatabase } from "./config/dbconnect.js"
dotenv.config({path: "backend/config/config.env"})

const app = express();

//connecting to database
connectDatabase();

app.use("/api/v1" , productRoutes);



app.listen(process.env.PORT, ()=>{
    console.log(`Server has been started on port = ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});