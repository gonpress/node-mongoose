
// 1
import express from 'express';
import asyncHandler from 'express-async-handler';
import orderModel from "../models/orderModel.js";

const router = express.Router();

// 3
// CRUD
router.get('/', asyncHandler(async(req,res)=> {
    const orders = await orderModel.find().populate('product');

    if(orders){
        res.json(orders);
    }else{
        res.status(404).json({
            msg:'no order',
        })
    }
}))

router.get('/:id', asyncHandler(async(req, res) => {
    const id = req.params.id;
    console.log(id);
    const order = await orderModel.findById(id).populate('product', 'id name price');

    if(order){
        res.json(order);
    }else{
        res.status(404).json({
            msg:'no order',
        })
    }
}))

// 주문하기 등록
router.post('/', asyncHandler(async(req,res)=> {
    const {
        // orderItems,
        product,
        qty,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    // console.log(orderItems.length);
    //
    // if(orderItems && orderItems.legnth === 0){
    //     return res.status(400).json({
    //         msg:"No order items"
    //     })
    // }

    const order = new orderModel({
        // orderItems,
        product,
        qty,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    })

    const createdOrder = await order.save();

    res.json(createdOrder);
}))

// order 수정
router.put('/:id', asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const {
        product,
        qty,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await orderModel.findById(id);
    if(order){
        order.product = product;
        order.qty = qty;
        order.shippingAddress = shippingAddress;
        order.paymentMethod = paymentMethod;
        order.itemsPrice = itemsPrice;
        order.taxPrice = taxPrice;
        order.shippingPrice = shippingPrice;
        order.totalPrice = totalPrice;
    }else{
        return req.status(404).json({
            msg:'수정할 order 없음',
        });
    }

    const updatedOrder = order.save();
    if(updatedOrder) res.json({msg:'order 수정 완료'});
}))

// order 삭제
router.delete('/:id', asyncHandler(async(req,res)=>{
    const id = req.params.id;

    const order = await orderModel.findById(id);
    if(order) {
        order.remove();
        res.json({msg:'order 삭제 완료'});
    }
    else {
        return res.status(404).json({msg :'삭제할 order가 없습니다'});
    }

}))

router.delete('/', asyncHandler(async(req,res)=> {
    const deletedOrders = await orderModel.deleteMany({});
    if(deletedOrders)
    {
        res.json({
            msg:'deleted order'
        });
    } else{
        res.status(404).json({
            msg:"삭제할 오더 없음",
        })
    }

}))

// 2
export default router;
