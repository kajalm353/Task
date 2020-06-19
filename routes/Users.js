var users = require('../models/Users')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const crypto = require('crypto');
const bcrypt = require("bcrypt");
var express = require('express')
const router = express.Router()


router.post('/', async (req, res) => {
    try {

        
        const user = new users(req.body)
        console.log("before",user);
        
        await user.save()
        console.log("after",user);
        
        res.status(200).send(user)
    } catch (e) {
        console.log(e);

        res.send(e)
    }
})



router.post('/login', async (req, res) => {

    try {
      // console.log(req.body);
  
      const { email, password } = req.body;

      // console.log(req.body);
      
  
  
      if (!email || !password) return res.status(401).send({ errors: 'invalid credentials' });
  
      const user = await users.findOne({ email }).lean()
      // console.log(user);
      
  
      if (!user) {
        return res.status(401).send('invalid credentials')
      }
      const token = jwt.sign({ email: user.email, _id: user._id }, 'jwtPrivateKey')
  
  
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
      return  res.status(401).send('invalid credentials')
      }
  
  
      else {
        // console.log(http200);
        delete user.password
  
        res
          // .header("x-access-token", token)
          .status(200)
          .send({ data: user, token: token })
  
      }
    } catch (e) {
      // console.log(e);
  
      res.status(500).send({
        message: 'Internal Server Error'
      })
    }
  });

module.exports = router