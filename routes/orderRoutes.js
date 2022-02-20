import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        msg: 'order 불러오기'
    })
})

router.post('/', (req, res) => {
    res.json({
        msg: 'order 등록'
    })
})

router.put('/', (req, res) => {
    res.json({
        msg: 'order 수정'
    })
})

router.delete('/', (req, res) => {
    res.json({
        msg: 'order 삭제'
    })
})

export default router;