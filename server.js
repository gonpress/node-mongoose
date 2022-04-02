import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import cors from 'cors';
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";
import * as path from "path";
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
// const swaggerJSON = require('./swagger/index.json')

// Router
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

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
app.use(cors({
    origin:true,
    credentials:true,
}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("api running");
})

// app.use('/api-docs', swaggerUi.server, swaggerUi.setup(swaggerJSON));
app.use('/products', productRoutes);
app.use('/order', orderRoutes);
app.use('/user', userRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8888;

app.listen(PORT, console.log("SERVER STARTED", PORT))