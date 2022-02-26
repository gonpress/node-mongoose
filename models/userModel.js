import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import gravatar from "gravatar";

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        profileImg:{
            type:String,
        },
        isAdmin:{
            type:Boolean,
            required:true,
            default:false,
        },
    },
    {
        timestamps:true,
    }
);

// password 매칭 함수
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// password 암호화 / avatar 자동생성
userSchema.pre('save', async function(next) {
    // password 암호화
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // 프로필 이미지 (아바타) 생성
    const avatar = await gravatar.url(this.email, {
        protocol : 'https',
        s:'200',
        r:'pg',
        d:'mm'
    })

    this.profileImg = avatar;
})

const User = mongoose.model('User', userSchema);
export default User;