import express from 'express'
import asyncHandler from 'express-async-handler'
import productModel from "../models/productModel.js";

const router = express.Router();

// Product를 불러오는 API
router.get('/', asyncHandler( async (req,res) => {

    const products = await productModel.find();
    res.json({
        count: products.length,
        products: products.map(product => (
            {
                id: product._id,
                name: product.name,
                price: product.price,
                brand: product.brand,
                desc: product.desc,
            }
        ))

    });
}));

// Product를 등록하는 API
router.post('/', asyncHandler( async (req, res) => {

    const {name, price, brand, description} = req.body;

    const newProduct = new productModel({
        name,
        price,
        brand,
        desc:description,
    });

    const createdProduct = await newProduct.save();

    res.json(createdProduct);
}));


// Product를 수정하는 API
router.put('/', (req, res) => {
    res.json({
        msg: '프로덕트 수정 됨',
    })
})

// Product를 삭제하는 API
router.delete('/', (req, res) => {
    res.json({
        msg: '프로덕트 삭제 됨'
    })
})

export default router;

