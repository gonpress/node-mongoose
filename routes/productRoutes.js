import express from 'express'
import {protect, admin} from "../middleware/authMiddleware.js";
import {
    getProducts,
    getProductById,
    createProduct,
    modifyProductById,
    deleteProducts, deleteProductById
} from "../controllers/productController.js";
import {uploadSingle} from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Product를 불러오는 API
router.get('/', getProducts);

// 특정 Product를 불러오는 API
router.get('/:id', protect, getProductById)

// Product를 등록하는 API
// router.post('/', protect, admin, uploadSingle.single('image'), createProduct);
router.post('/', protect, admin, createProduct);

// Product를 수정하는 API
router.put('/:id', protect, admin, modifyProductById);

// Product 전체를 삭제하는 API
router.delete('/', protect, admin, deleteProducts);

// 특정 Product를 삭제하는 API
router.delete('/:id', protect, admin, deleteProductById)

export default router;

