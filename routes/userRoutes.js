import express from 'express';
import asyncHandler from 'express-async-handler';
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';

const router = express.Router();


// 회원가입 API
router.post('/register', asyncHandler(async(req, res)=> {
    const {name, email, password} = req.body;
    const userExists = await userModel.findOne({email})
    if(userExists) {
        return res.status(404).json({
            msg:'User already exists',
        })
    }

    // password 암호화
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);


    // 프로필 이미지 자동생성
    const avatar = await gravatar.url(email, {
        protocol:'https',
        s:'200',
        r:'pg',
        d:'mm'
    })

    const user = new userModel({
        name,
        email,
        password:passwordHashed,
        profileImg:avatar
    });

    const createdUser = await user.save();
    res.json({
        msg:'유저 생성 완료',
        userInfo:createdUser,
    })
}))

// 로그인 API
router.post('/login', asyncHandler(async(req, res) => {
    res.json({msg:'login'});
}))



export default router;