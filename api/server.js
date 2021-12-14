'use strict';
require('dotenv').config()
const connectDB = require('./db')
connectDB()

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');


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

// To list products in a cart of user with username
app.post('/api/products', async (req, res) => {
  console.log('server called /api/products')
  const dbproducts = await Product.find({})

  let products = [], id = null;
  
  let cart = JSON.parse(req.body.cart);
  if (!cart){
    console.log('Server side error return')
    return res.json(products)
  } 
  let cnt = 0
  for (var i = 0; i < dbproducts.length; i++) {
    id = dbproducts[i].id.toString();
    if (cart.hasOwnProperty(id)) {
      dbproducts[i].qty = cart[id]
      //data.products[i].qty = cart[id]
      /* const jjproduct = []
       jjproduct.qty =  cart[id]
       jjproduct.id = dbproducts[i].id
       jjproduct.name=dbproducts[i].name
       jjproduct.price=dbproducts[i].price
       jjproduct.available_quantity=dbproducts[i].available_quantity
       jjproduct.imgUrl=dbproducts[i].imgUrl
       jjproduct.description=dbproducts[i].description
*/
      console.log("server side id: " +id +  "db:  " +  dbproducts[i].qty +"cart[id]: " +cart[id] )
      products.push(dbproducts[i])//dbproducts[i]);
      //products[cnt].qty =cart[id]
      cnt++
    }
  }
  console.log("server side products[0].price: " +products[0].price + ' products[0].qty ' +products[0].qty )
  //console.log("server side products[1].price: " +products[1].price + ' products[1].qty ' +products[1].qty )

  return res.json(products);
});

app.post('/api/auth', async (req,res) => {
  //const user = await User.find({'name':req.body.name})
  const popo = await Product.find({name:"CHECK PRINT SHIRT"})
  console.log("popo print: " + popo.length + ' name: ' + popo[0].name)
  const user = await User.find({name:req.body.name})
  console.log('aaaaaaaaaayyyyyyooooooooooooo')
  //console.log('username match: ' + user[0].name + ' req.name: ' + req.body.name)

  if(!user.length)
   {
     //console.log('username match: ' + user[0].name + ' req.name: ' + req.body.name + ' pwd match: ' + user[0].password == req.body.password)
    return res.status("409").json("Authentication failed.")//!(user[0].name == req.body.name && user[0].password == req.body.password);
   }

  
  if (user.length){
      console.log('ajsfgsagfULGSLIFGUGFILGUSFGIUASGfuisagFLUIGSALUIgfuasGFULIGAIUGSUILGV IUCASGviugsapigvugvuigsuiagv ui  g')
      let token_payload = {name: user[0].name, password: user[0].password};
      let token = jwt.sign(token_payload, "jwt_secret_password", { expiresIn: '2h' });
      let response = { message: 'Token Created, Authentication Successful!', token: token };

      
      return res.status(200).json(response);

  } else {
      return res.status("409").json("Authentication failed.");
  }
});

const PORT = 5000;

app.listen(PORT);
console.log('api runnging on port ' + PORT + ': ');