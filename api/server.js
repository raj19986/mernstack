'use strict';
require('dotenv').config()
const connectDB = require('./db')
connectDB()

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');
const middleware = require('./middleware');

const Product = require('./Product')
const User = require('./User')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({})

    res.json(products)
} catch (error) {
    console.error(error)
    res.status(500).json({message: "Server Error"})
}

  /*return res.json(data.products);*/
});

app.post('/api/products', async (req, res) => {

  const dbproducts = await Product.find({})

  let products = [], id = null;
  let cart = JSON.parse(req.body.cart);
  if (!cart) return res.json(products)
  for (var i = 0; i < dbproducts.length; i++) {
    id = dbproducts[i].id.toString();
    if (cart.hasOwnProperty(id)) {
      dbproducts[i].qty = cart[id]
      products.push(dbproducts[i]);
    }
  }
  return res.json(products);
});

app.post('/api/auth', async (req,res) => {
  //const user = await User.find({'name':req.body.name})
  const user = await User.find({name:req.body.name})
  if(( user.name == req.body.name && user.password == req.body.password))
    return user.name == req.body.name && user.password == req.body.password;

  /*let user = data.users.filter((user) => {
    return user.name == req.body.name && user.password == req.body.password;
  });*/
  if (user.length){
      // create a token using user name and password vaild for 2 hours
      let token_payload = {name: user[0].name, password: user[0].password};
      let token = jwt.sign(token_payload, "jwt_secret_password", { expiresIn: '2h' });
      let response = { message: 'Token Created, Authentication Successful!', token: token };

      // return the information including token as JSON
      return res.status(200).json(response);

  } else {
      return res.status("409").json("Authentication failed. admin not found.");
  }
});

const PORT = 5000;

app.listen(PORT);
console.log('api runnging on port ' + PORT + ': ');