/**
 * This is the userproduct model.
 * Creating schema for userproduct
 *
 * @class userproduct
 */
var mongoose = require('mongoose')

var userproductSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
        createdOn: { type: Date, default: new Date() },
        updatedOn: { type: Date, default: new Date() },
    })

var collectionName = 'userproduct';
var userproducts = mongoose.model('userproduct', userproductSchema, collectionName);

module.exports = userproducts;