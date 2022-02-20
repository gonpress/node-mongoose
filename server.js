import express from 'express'
import morgan from 'morgan'
import bodyParser from "body-parser";

// Router
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// ES5 문법
// const express = require("express")
const app = express()


// 설정
//morgan은 로그
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.send("api running");
})

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


const PORT = 9999;
app.listen(PORT, console.log("SERVER STARTED"))