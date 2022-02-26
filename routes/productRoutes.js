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

// 특정 Product를 불러오는 API
router.get('/:id', asyncHandler( async (req, res) => {

    const productId = req.params.id;
    const product = await productModel.findById(productId);
    if(product){
        res.json(product);
    }else{
        res.status(404).json({
            msg: '프로덕트 없음',
        })
    }
}))

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
router.put('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;

    const {name, price, brand, desc} = req.body;

    const product = await productModel.findById(id);
    if(product){
        product.name = name;
        product.price = price;
        product.brand = brand;
        product.desc = desc;

        const updatedProduct = await product.save();
        res.json({
            msg: 'updated at ' + id,
            updatedProduct,
        })

    }else {
        res.status(404).json({
            msg: '수정할 데이터가 없습니다.',
        })
    }

    /*res.json({
        msg: '프로덕트 수정 됨',
    })*/
}));

// Product 전체를 삭제하는 API
router.delete('/', asyncHandler( async (req, res) => {
    await productModel.deleteMany({});
    res.json({
        msg: '프로덕트 삭제 됨',
    })
}));

// 특정 Product를 삭제하는 API
router.delete('/:id', asyncHandler( async (req, res) => {
    const productId = req.params.id;

    const product = await productModel.findById(productId);
    if(product){
        await product.remove();
        res.json({
            msg: '프로덕트 removed',
        })
    } else{
        res.status(404).json({
            msg: '프로덕트 없음',
        })

    }
}))

export default router;

