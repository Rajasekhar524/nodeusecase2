const express = require('express')
const router = express.Router();

const Product = require('./../../models/Product')

router.get('/',async(req,res) => {
    try {
        const product = await Product.find();
           res.send(product)
       
        } catch(err) {
            console.log(err)
        }  
})

router.post('/',async(req,res,next) => {
    try {
        const product = await Product.create(req.body);
           res.send(product)
       
        } catch(err) {
            console.log(err)
        }   
})

router.get('/:productId',async(req,res,next) => {
    try {
        const oneproduct = await Product.findById(req.params.productId);
        res.status(200).json({
            status: 'success',
            data:oneproduct
        })
        // res.send(oneCollege)
       
    } catch(err) {
        console.log(err)
    }
    
})

router.delete('/:productId',async(req,res,next) => {
    try {
        const product = await Product.deleteOne(req.params.id);
           res.send(product)
       
        } catch(err) {
            console.log(err)
        }  
})


module.exports = router;