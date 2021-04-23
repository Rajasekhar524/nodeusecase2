const express = require('express')
const router = express.Router();
const Order = require('./../../models/Order')
const Product = require('./../../models/Product')

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString =queryString;
    }

    filtering() {
        const queryobj = {...this.queryString};
        const excludedfields=['page','sort','limit'];
        excludedfields.forEach(el=>delete queryobj[el]);
        let querystr = JSON.stringify(queryobj);
        querystr = querystr.replace(/\b(gte|gt|lt|lte)\b/g, match=>`$${match}`);
        this.query.find(JSON.parse(querystr));
        return this;
    }
    sorting() {
        if(this.queryString.sort){
            const sortby = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortby);
        }
        else {
            this.query = this.query.sort('-createAt');
        }
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

router.get('/',async(req,res) => {
    try {
        const features = new APIfeatures(Order.find(),req.query).filtering();
        
        const orders = await features.query;
        res.send(orders)
        
        res.status(200).json({
            count:order.length,
            status: 'success',
            data:order
        })
       
        } catch(err) {
            console.log("orders not found")
        } 
})

router.post('/',async(req,res,next) => {
    Product.findById(req.body.product)
    const id = req.body.product
    try{ 
            Product.findByIdAndUpdate(id,{
               $dec: {
                   inventory:1
               },
                upsert:true,
                new:true,
                })
           
            const order =  await Order.create(req.body);
            res.send(order)
    } catch(err){ 
        res.send("product not exists")
    }
})

router.get('/:orderId',async(req,res,next) => {
    try {
        const oneorder = await Order.findById(req.params.orderId);
        res.status(200).json({
            status: 'success',
            data:oneorder
        })
    
       
    } catch(err) {
        res.send(err)
    }
})

// router.delete('/:orderId',(req,res,next) => {
//     res.status(200).json({
//         message:'Order deleted',
//         orderId: req.params.orderId
//     })
// })


module.exports = router;