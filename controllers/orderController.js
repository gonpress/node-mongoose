import asyncHandler from "express-async-handler";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

export const getOrders = asyncHandler(async(req,res)=> {
    const orders = await orderModel
        .find()
        .populate('product')
        .populate('user');

    console.log(orders);

    if(orders){
        res.json(orders);
    }else{
        res.status(404).json({
            msg:'no order',
        })
    }
});

export const getOrderById = asyncHandler(async(req, res) => {
    const id = req.params.id;

    const user = await userModel.findById(req.user._id);
    if(!user){
        return res.status(404).json({
            msg:'user 없음',
        })
    }

    const order = await orderModel
        .findById(id)
        .populate('product', 'id name price')
        .populate('user');

    // TODO
    // 로그인한 사용자가 주문한것만 보이게 하기
    console.log(order.user._id);

    if(order){

        res.json(order);
    }else{
        res.status(404).json({
            msg:'no order',
        })
    }
})

export const createOrder = asyncHandler(async(req,res)=> {
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
        user:req.user._id,
    })

    const createdOrder = await order.save();

    res.json(createdOrder);
})

export const updateOrder = asyncHandler(async(req,res)=>{
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
        return res.status(404).json({
            msg:'수정할 order 없음',
        });
    }

    const updatedOrder = order.save();
    if(updatedOrder) res.json({msg:'order 수정 완료'});
})

export const deleteOrderbyId = asyncHandler(async(req,res)=>{
    const id = req.params.id;

    const order = await orderModel.findById(id);
    if(order) {
        order.remove();
        res.json({msg:'order 삭제 완료'});
    }
    else {
        return res.status(404).json({msg :'삭제할 order가 없습니다'});
    }

})

export const deleteOrders = asyncHandler(async(req,res)=> {
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

})