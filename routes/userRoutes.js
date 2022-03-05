import express from 'express';
import asyncHandler from 'express-async-handler';
import userModel from "../models/userModel.js";
import {protect, admin} from "../middleware/authMiddleware.js";

import generateToken from "../utils/generateToken.js";


const router = express.Router();


router.get('/', protect, admin, asyncHandler(async(req, res)=>{
    const users = await userModel.find();

    if(users){
        res.json({
            count:users.length,
            users,
        })
    } else{
        res.status(404).json({msg:'user not found'});
    }
}))

// 회원가입 API
router.post('/register', asyncHandler(async(req, res)=> {
    const {name, email, password} = req.body;
    const userExists = await userModel.findOne({email})
    if(userExists) {
        return res.status(404).json({
            msg:'User already exists',
        })
    }

    const user = new userModel({
        name,
        email,
        password,
    });

    const createdUser = await user.save();
    res.json({
        msg:'유저 생성 완료',
        userInfo:createdUser,
    })
}))

// 로그인 API
router.post('/login', asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    // email 유무 체크
    const user = await userModel.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            token: generateToken(user._id)
        });
    }else{
        res.status(404).json({
            msg:'Invalid email or password'
        })
    }
}))

router.get('/profile', protect, asyncHandler(async(req, res) => {
    const user = await userModel.findById(req.user._id);

    if(user){
        res.json({
            id:user._id,
            email:user.email,
            name:user.name,
        });
    }else{
        res.status(404).json({msg:'User not found'});
    }
}))

// 내 id 맞는지 확인하고 삭제
router.delete('/delete', protect, asyncHandler(async(req,res) => {
    const user = await userModel.findById(req.user._id);

    if(user){
        user.remove();
        res.json({msg:'deleted user'});
    }else{
        res.status(404).json({msg:'delete fail'});
    }
}))

// 내 profile 수정
router.put('/modify', protect, asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;
    const user = await userModel.findById(req.user._id);

    if(user){
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;

        const updatedUser = await user.save();
        res.json({msg:'updated user'});
    }else{
        res.status(404).json('user not found');
    }
}))

export default router;