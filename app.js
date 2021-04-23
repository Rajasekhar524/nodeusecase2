const express =require('express');
const mongoose = require('mongoose');
const app =express();
app.use(express.json())
const PORT = 5000;

const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');


const dbURI = 'mongodb+srv://Raj:211221@cluster1.mg6wb.mongodb.net/nodeClg?retryWrites=true&w=majority'

mongoose.connect(dbURI,{useNewUrlParser:true,
                        useUnifiedTopology:true,
                        useCreateIndex:true })
                        .then(console.log('connected'))
                        .then((result)=> app.listen(PORT, ()=>console.log("server running")))
                        .catch((err)=>console.log(err));



app.use('/products', productRoutes)
app.use('/orders',orderRoutes)
