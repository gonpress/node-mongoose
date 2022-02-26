import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import connectDB from "./config/db.js";

// Router
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// ES5 문법
// const express = require("express")
const app = express();

dotenv.config();
connectDB();

// 설정
//morgan은 로그
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("api running");
})

app.use('/products', productRoutes);
app.use('/order', orderRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 8888;

app.listen(PORT, console.log("SERVER STARTED"))