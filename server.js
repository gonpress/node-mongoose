import express from 'express'
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// ES5 문법
// const express = require("express")
const app = express()


app.get("/", (req, res) => {
    res.send("api running");
})

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


const PORT = 9999;
app.listen(PORT, console.log("SERVER STARTED"))