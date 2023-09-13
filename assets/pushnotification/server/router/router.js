/* eslint-disable */
const express = require('express')
const Routes = express.Router()
const {
  loginAuth,
  getProduct,
  UserDetails,
  SendMail,
  getOrderDetails,
  OrderHistory,
  ProductTagApi,
  sendOtp,
  verifyOtp,
  resendOtp,
  addinwishlist,
  getWishlistItems,
  getWishlist,
  unlinkproductwishlist,
  unlinkproductdashboard,
  productwishlist,
  ProductColor,
  getCategory,
  createCartData,
  getHomePgeData,
  getCartData,
  cartRemoveItem,updateQty,
  serachProduct,
  getDataOfProduct,
  getNewImage,
  getProductName,
  getNotification
} = require('../controller/controllerM1')


//for login auth
Routes.post('/loginAuth', loginAuth)
Routes.post('/sendOtp/:phone', sendOtp)
Routes.post('/verifyOtp', verifyOtp)
Routes.post('/resendOtp', resendOtp)

//for dashboard
//---------------------new change 28-----------------------
Routes.post('/getProductName',getProductName);
Routes.post('/getNewImage',getNewImage)
Routes.post('/serachProduct',serachProduct)
Routes.post('/getDataOfProduct',getDataOfProduct)
//---------------------new change 28-----------------------

Routes.post('/getProduct',getProduct)
Routes.post('/ProductTagApi/:id',ProductTagApi)
Routes.post('/ProductColor/:name',ProductColor)

//for user profile
Routes.post('/UserDetails/:id',UserDetails)

//for contact-us
Routes.post('/SendMail',SendMail)

//for get order details
Routes.post('/OrderDetails/:id',getOrderDetails)
Routes.post('/OrderHistory/:id',OrderHistory)

//for wishlist sections.
Routes.post('/addinwishlist',addinwishlist);
Routes.post('/getWishlistItems',getWishlistItems);
Routes.post('/unlinkproductwishlist',unlinkproductwishlist);
Routes.post('/unlinkproductdashboard',unlinkproductdashboard);
Routes.post('/productwishlist',productwishlist)
Routes.get('/getCategory',getCategory)


//for add to cart
Routes.post('/createCartData',createCartData);
Routes.post('/getCartData',getCartData);
Routes.post('/cartRemoveItem',cartRemoveItem)
Routes.put('/updateQty',updateQty)
//test
Routes.post('/getWishlist',getWishlist)

//Home Page
Routes.post('/getHomePgeData',getHomePgeData)
Routes.post('/getNotification',getNotification)


module.exports = Routes
