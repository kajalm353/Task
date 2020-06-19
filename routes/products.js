var product = require('../models/Products')
var express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const products = require('../models/Products')
const userproduct = require('../models/userproduct')




router.post('/', auth, async (req, res) => {
    try {

        // console.log(req.body);
        
        const Products = new product(req.body)

        // console.log("product",Products);
        
        await Products.save()
        res.status(200).send(Products)
    } catch (e) {
        // console.log(e);

        res.send(e)
    }
})

router.get('/', auth, async (req, res) => {
    try {
        if (req.query.productId) {
            // console.log("Ssssssssss");
// console.log(req.query.productId);

            let data = await product.findOne({ _id: req.query.productId })
            // console.log("data",data);
            
            res.status(200).send(data)
        } else {

            res.status(422).send('proper data required')

        }

    } catch (e) {
        // console.log(e);

        res.send(e)
    }
})

router.put('/', auth, async (req, res) => {
    try {

        if (!req.query.productId) {
            return res.status(500).send('productId required')
        }
        let updateproducts = await products.findOneAndUpdate({ _id: req.query.productId }, { $set: req.body}, { new: true })

        res.status(200).send(updateproducts);

    } catch (e) {

        res.send(e)
    }
})


router.delete('/', auth, async (req, res) => {
    try {

        if (!req.query.productId) {
            return res.status(500).send('productId required')
        }


            let deleteproducts = await product.findOneAndDelete({ _id: req.query.productId })
            let deletedProducts = await userproduct.findOneAndDelete({productId: req.query.productId})
            res.status(200).send({message:"product deleted"});
        
    } catch (e) {
        res.send(e)
    }
})


module.exports = router