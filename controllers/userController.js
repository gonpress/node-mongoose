import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async(req, res) => {
    const users = await userModel.find();

    if(!users){
        res.status(401);
        throw new Error('User not found');
    }

    res.json({
        count:users.length,
        users,
    })
})

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    const userExists = await userModel.findOne({email})
    if(userExists) {
        // return res.status(404).json({
        //     msg:'User already exists',
        // })
        res.status(400)
        throw new Error('User already exists');
    }
    console.log(password);
    try{
        const user = new userModel({
            name,
            email,
            password,
        });

        if(user){
            const createdUser = await user.save();
            res.json(user);
        } else{
            res.status(400)
            throw new Error('Invalid user data');
        }
    } catch (e) {
        console.log(e);
    }
})

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    // email 유무 체크
    const user = await userModel.findOne({email});
    if(user && (await user.matchPassword(password))){
        const token = generateToken(user._id);
        // res.cookie('user', token, {
        //     httpOnly:false,
        //     maxAge: 24 * 60 * 60 * 1000,
        // });
        res.json({
            email:user.email,
            name:user.name,
            token,
        });
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

const profileUser = asyncHandler(async(req, res) => {
    const user = await userModel.findById(req.user._id);

    if(user){
        res.json({
            id:user._id,
            email:user.email,
            name:user.name,
        });
    }else{
        // res.status(404).json({msg:'User not found'});
        res.status(404);
        throw new Error('User not found');
    }
})

const deleteUser = asyncHandler(async(req,res) => {
    const user = await userModel.findById(req.user._id);

    if(user){
        user.remove();
        res.json({msg:'deleted user'});
    }else{
        // res.status(404).json({msg:'delete fail'});
        res.status(404);
        throw new Error('delete fail');
    }
})

const modifyProfileUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;
    const user = await userModel.findById(req.user._id);

    if(user){
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;

        const updatedUser = await user.save();
        res.json({msg:'updated user'});
    }else{
        // res.status(404).json('user not found');
        res.status(404);
        throw new Error('user not found');
    }
})

export {
    authUser,
    registerUser,
    loginUser,
    profileUser,
    deleteUser,
    modifyProfileUser,
}