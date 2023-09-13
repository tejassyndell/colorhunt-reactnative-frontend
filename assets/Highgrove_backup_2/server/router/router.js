/ eslint-disable /

const express = require('express')
const Routes = express.Router()

const {
    loginAuth,
    allUser,
    registerUser,
    GetUserDetails,
    UpdateUserdetais,
    userProfile,
    updateProfile,
    userDelete,
    userExist,
    authUser,
    sendMail,
    setNewPassword,
    customersData,
    updateCustomersData,
    UpdateProductsData
  } = require('../Controller/Login')
  const {
    fetchCustomerIds,
    GetorderDetails,
    getAccessToken,
    filterDates,
    GetLatestorderDetails,
    fetchProductdata,
    fetchProductOptions,
    customersdetails,
    productsdetails,
    cartdetails,
    cartorder,
    osrefValidation,
    cartorderbyid,
    ProductVariations,
    ProductVariationsById,
    shippingAddress,
    RemoveProduct,
    updateOrderData,
    changeLogDetail,
    getProductSize,
    AddVarient,
    getProductDetails,
    storeproduct,
    deleteVariant,
    ViewVarient,
    variationDelete,
    selectVariationDelete,
    variationEdit,
    fetchVariationsDetails,
    deleteProductWithvariation,
    getEditproductDetail,
    updateProductVariation,
    fetchOrderDetails,
    deleteCartOrder,
    fetchorderedProducts,
    fetchcartproductData,
    saveChangesLogs,
    deleteOrderProduct,
    addColorVariation,
    fetchLogs,
    updateCartData,
    showProducts,
    selectCategory,
    fetchColorsDetails,
    deleteColor,
    customersdetailsid,
    customerSproductsData,
    SaveOrderData,
    placeOrder,
    testfunction,
    GetColourData,
    ViewDetails,
    cartId,
    orderDelete,
    updateDashboardData,
    fetchOrderDataToPush,
    allOrderDelete
  } = require('../Controller/Login/indexM2')

  const {pushOrdersToSage} = require('../Controller/Login/sageController')

//for login auth
Routes.post('/loginAuth', loginAuth)

//Customer
Routes.get('/customersData', customersData)
Routes.get('/testfunction', testfunction)

Routes.get('/UpdateCustomersData', updateCustomersData)
Routes.get('/UpdateProductsData', UpdateProductsData)

//for user management
Routes.get('/userDetails', allUser)
Routes.post('/registerUser', registerUser)
Routes.delete('/userDelete/:id', userDelete)
Routes.get('/getUserDetais/:ID', GetUserDetails)
Routes.put('/updateUser', UpdateUserdetais)

//Dashboard order
Routes.post('/orderDelete',orderDelete) 


//user Profile
Routes.get('/profile', userProfile)
Routes.put('/updateprofile', updateProfile)
// for forgot pass
Routes.post('/ForgotPass', userExist)

//to send email to user
Routes.get('/sendmail', sendMail)

//to check user is authentic or not
Routes.post('/confirmuser', authUser)


// to update password
Routes.get('/updatePassword', setNewPassword)


// Milestone 2-----------------------
//to fetch customer ids from database
Routes.post('/fetchCusID', fetchCustomerIds )

//for Customers
Routes.get('/customersdetails', customersdetails)

//to get Access token
Routes.post('/getAccesstoken', getAccessToken)

//for Products
Routes.get('/productsdetails', productsdetails)
Routes.post('/variationdetails', ViewVarient)
Routes.post('/variationDelete', deleteVariant)
// Routes.post('/selectVariantDelete', selectVariationDelete)
// Routes.post('/selectVariantDelete', selectVariationDelete)
Routes.put('/variationEdit', variationEdit)

//for Cart
Routes.get('/cartdetails', cartdetails)

//for fetch orders details
Routes.get('/orderDetails', GetorderDetails)
Routes.get('/latestOrderDetails', GetLatestorderDetails)
Routes.get('/cartorder', cartorder)

Routes.post('/osrefValidation', osrefValidation)
Routes.get('/cartorderbyid/:id',cartorderbyid)
Routes.get('/productvariations/:id',ProductVariations)
Routes.get('/shippingaddress/:id', shippingAddress)
Routes.put('/updateOrderData/:id', updateOrderData)
Routes.get('/ProductVariationsById/:id', ProductVariationsById)
Routes.get('/changeLogDetail/', changeLogDetail)
Routes.get('/remove_product/:id', RemoveProduct)

//for fetch orders details

//to filter data date wise in all orders
Routes.post('/filterDates', filterDates)


//to fetch  products data when user selec type for order
Routes.post('/getproductdetails',fetchProductdata )

//to fetch  products data when user selec type for order
Routes.post('/getproductoptions',fetchProductOptions)

//to fetch  products data when user selec type for order
Routes.post('/getproductsizes',getProductSize)

// //to add variation in product (Attribute)
// Routes.post('/addVarient',AddVarient)

//to get product varient details
Routes.post('/getproductDetail',getProductDetails)

//to store product data
Routes.put('/storeproduct',storeproduct)

//to Delete any perticular variation
Routes.post('/deleteVariant',deleteVariant)

Routes.post('/selectVariantDelete',selectVariationDelete)
//to fetch  products data when user selec type for order
Routes.post('/addVarient',AddVarient)

//to fetch variation details when user clicks from all products
Routes.post('/fetchvariations',fetchVariationsDetails)

//to delete product and its all variations

Routes.post('/deleteproductvariation',deleteProductWithvariation)

//to fetch  products data when user selec type for order
Routes.post('/getproductsizes',getProductSize)

// //to add variation in product (Attribute)
// Routes.post('/addVarient',AddVarient)

//to get product varient details
Routes.post('/getproductDetail',getProductDetails)

//to store product data
Routes.put('/storeproduct',storeproduct)

//to Delete any perticular variation
// Routes.post('/deleteVariant',deleteVariant)


//to fetch  products data when user selec type for order
Routes.post('/addVarient',AddVarient)

//to fetch product details for editable product
Routes.post('/fetcheditProductDetails',getEditproductDetail)

//to delete product from cart 
Routes.post('/deleteCartOrder',deleteCartOrder)

//to fetch particular order  product data
Routes.post('/fetchorderproducts',fetchorderedProducts)

//to store product data
Routes.put('/updateProductVariation',updateProductVariation)

//to fetch order details when user clicks from all order
Routes.post('/fetchorder',fetchOrderDetails)

//to fetch cart products data
Routes.post('/fetchcartproductData',fetchcartproductData)

//to save logs into database
Routes.post('/saveLogs',saveChangesLogs)

//to delete product from cart 
Routes.post('/deleteOrderProduct',deleteOrderProduct)
//to fetch logs of order
Routes.post('/getlogs',fetchLogs)
//to update cart
Routes.put('/updateCart',updateCartData)

//to Show all variations for selected Customer
Routes.post('/showProducts',showProducts)

//to Show all variations for selected Customer
Routes.post('/selectCategory',selectCategory)

//to fetch color details when user clicks from all color groups
Routes.post('/fetchcolors',fetchColorsDetails)

//to edit color variations
Routes.post('/editcolors',addColorVariation)

//to Delete any perticular color variation
Routes.post('/deleteColor',deleteColor)

Routes.get('/getCustomersDetails/:id',customersdetailsid)


//to Show all variations for selected Customer
Routes.post('/SaveOrderData',SaveOrderData)

//to place order
Routes.post('/placeorder',placeOrder)

//to get colour data for order create
Routes.get('/getColourData', GetColourData)

Routes.post('/ViewDetails',ViewDetails)
// Routes.post('/cartId',cartId)

// to update placed order
Routes.post('/updateDashboardData',updateDashboardData)

// to push data in sage
Routes.post('/pushOrders',pushOrdersToSage)

// to fetch data to push in sage
Routes.post('/fetchOrderDataToPush',fetchOrderDataToPush)
Routes.post('/allOrderDelete',allOrderDelete)

module.exports = Routes
