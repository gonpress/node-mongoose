
// 1
import express from 'express';
import {protect, admin} from "../middleware/authMiddleware.js";
import {
    createOrder,
    updateOrder,
    getOrderById,
    getOrders,
    deleteOrderbyId,
    deleteOrders
} from "../controllers/orderController.js";

const router = express.Router();

// 3
// CRUD
router.get('/', protect, admin, getOrders)

router.get('/:id', protect, getOrderById)

// 주문하기 등록
router.post('/', protect, createOrder)

// order 수정
router.put('/:id', protect, updateOrder)

// order 삭제
router.delete('/:id', protect, deleteOrderbyId)

router.delete('/', protect, admin, deleteOrders)

// 2
export default router;
