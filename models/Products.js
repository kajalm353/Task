/**
 * This is the product model.
 * Creating schema for product
 *
 * @class product
 */
var mongoose = require('mongoose')

var productSchema = new mongoose.Schema(
    {
        product_name: { type: String},
        product_image: {type: String},
        product_price: {type: Number},
        createdOn: { type: Date, default: Date.now },
        updatedOn: { type: Date, default: Date.now }
    })

var collectionName = 'products';
var products = mongoose.model('products', productSchema, collectionName);

module.exports = products;