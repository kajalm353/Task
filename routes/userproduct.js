var userProduct = require('../models/userproduct')
var express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const products = require('../models/Products')
const users = require('../models/Users')
var mongoose = require('mongoose')




router.post('/', auth, async (req, res) => {
    try {

        console.log(req.body);
        
        req.body.userId = req.user._id

        const userProducts = new userProduct(req.body)

        console.log("product",userProducts);
        
        await userProducts.save()
        res.status(200).send(userProducts)
    } catch (e) {
        // console.log(e);

        res.send(e)
    }
})


router.get('/fetchingproductdata',auth, async(req,res) => {
try {
// console.log(req.user);

     const userProducts = await userProduct.aggregate([
         {
             $match : {userId :mongoose.Types.ObjectId(req.user._id)}
         },
         {
            $lookup:
              {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product_docs"
              }
         }
     ])
     res.send(userProducts)
} catch (error) {
    // console.log(error);
    res.send(error)
    
}
})


router.get('/fetchinguserdata',auth, async(req,res) => {
    try {
    // console.log(req.query.productId);
    
         const products_user = await userProduct.aggregate([
             {
                 $match : {productId : mongoose.Types.ObjectId(req.query.productId) }
             },
             {
                $lookup:
                  {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user_docs"
                  }
             }
         ])
        //  console.log(products_user);
         
         res.send(products_user)
    } catch (error) {
        // console.log(error);
        res.send(error)
        
    }
    })



module.exports = router