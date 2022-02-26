
// 1
import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();


// 3
// CRUD
router.get('/', asyncHandler(async(req,res)=> {
    res.json({msg:'order'});
}))

router.get('/:id', asyncHandler(async(req, res) => {

}))

router.post('/', asyncHandler(async(req,res)=> {

}))

router.put('/:id', asyncHandler(async(req,res)=>{

}))

router.delete('/', asyncHandler(async(req,res)=> {

}))

router.delete('/:id', asyncHandler(async(req,res)=>{

}))



// 2
export default router;
