const express = require('express');
const bodyParser = require('body-parser');

const users = require('../routes/Users')
const Products = require('../routes/products')
const userProducts = require('../routes/userproduct')
const cors = require('../middleware/cors')


module.exports = function (app) {
  app.use(cors)
  app.use(bodyParser({
    limit: '50mb'
  }));
  app.use(express.json());
  app.use('/api/users', users)
  app.use('/api/product',Products)
  app.use('/api/userproduct',userProducts)
};
