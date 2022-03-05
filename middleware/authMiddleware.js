import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import userModel from '../models/userModel.js';

const protect = asyncHandler( async(req, res, next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        try{
            // token 검증
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await userModel.findById(decoded.id);

            next();
        }catch (e) {
            // token 검증과정에서 에러 발생 시
            // token에 유저정보가 없을 때 에러가 발생한다면
            console.error(e);
            res.status(401).json({
                msg: e.message,
            })
        }
    }
})

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    } else{
        res.status(401).json({
            msg:'Not authorized as an admin',
        })
    }
}

export {protect, admin};