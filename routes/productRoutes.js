import express from 'express'

const router = express.Router();


// Product를 불러오는 API
router.get('/', (req,res) => {
    res.json({
        msg: '전체 불러오기',
        products: []
    })
})

// Product를 등록하는 API
router.post('/', (req, res) => {
    res.json({
        msg: '프로덕트 등록 됨',
    })
})


// Product를 수정하는 API
router.put('/', (req, res) => {
    res.json({
        msg: '프로덕트 수정 됨',
    })
})

// Product를 삭제하는 API
router.delete('/', (req, res) => {
    res.json({
        msg: '프로덕트 삭제 됨'
    })
})

export default router;

