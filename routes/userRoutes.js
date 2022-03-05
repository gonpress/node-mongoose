import express from 'express';
import {protect, admin} from "../middleware/authMiddleware.js";

import {
    authUser,
    deleteUser,
    loginUser,
    modifyProfileUser,
    profileUser,
    registerUser
} from "../controllers/userController.js";

const router = express.Router();

// 전체 User 불러오기 API
router.get('/', protect, admin, authUser)

// 회원가입 API
router.post('/register', registerUser)

// 로그인 API
router.post('/login', loginUser)

// profile 불러오기 API
router.get('/profile', protect, profileUser)

// 내 id 맞는지 확인하고 삭제
router.delete('/delete', protect, deleteUser)

// 내 profile 수정
router.put('/modify', protect, modifyProfileUser)

export default router;