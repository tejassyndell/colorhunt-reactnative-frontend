/* eslint-disable */
import axios from 'axios'
const url = 'http://localhost:8010'
// const url = 'http://192.168.2.199:8070'
// const url = 'https://highgrove-backend.sincprojects.com'
// const url = 'https://highgrove-backend-final.sincprojects.com'
// const url = 'https://highgrove-milestone-2.sincprojects.com'


export const loginAuth = async (user) => {
    try {
      // console.log(user)
      return await axios.post(`${url}/loginAuth`, user)
    } catch (err) {
      console.log(err, 'err in react api')
    }
}

//to ger user details
export const UserDetails = async () => {
  try {
    return await axios.get(`${url}/userDetails`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to get customer details
export const customerDetails = async () => {
  try {
    return await axios.get(`${url}/customersData`)
  } catch (err) {
    console.log(err)
  }
}


//updae customer details
export const UpdateCustomersData = async () => {
  console.log('sdfsdfdsf')
  try {
    return await axios.get(`${url}/UpdateCustomersData`)
  } catch (err) {
    console.log(err)
  }
}


//updae customer details
export const UpdateProductsData = async () => {
  console.log('UpPro')
  try {
    return await axios.get(`${url}/UpdateProductsData`)
  } catch (err) {
    console.log(err)
  }
}



//for register user
export const RegisterUser = async (user) => {
  try {
    console.log(user)
    return await axios.post(`${url}/registerUser`, user)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to get user details
export const GetUserDetails = async (ID) => {
  try {
    return await axios.get(`${url}/getUserDetais/${ID}`)
    // return await axios.get(`${url}/delete/${userId}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to update user details
export const UpdateUserdetais = async (state) => {
  try {
    return await axios.put(`${url}/UpdateUser`, state)
    // return await axios.get(`${url}/delete/${userId}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//for delete user
export const userDelete = async (ID) => {
  try {
    console.log(ID)
    return await axios.delete(`${url}/userDelete/${ID}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

/**** order delete from dashboard****/
export const orderDelete = async (id) => {
  try {
    return await axios.post(`${url}/orderDelete`, id)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to ger user Profile
export const UserProfile = async (userId) => {
  // console.log('****userIduserId****',userId)
  try {
    return await axios.get(`${url}/profile?id=${userId}`)
    // return await axios.get(`${url}/profile/${userId}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//
export const UpdateProfile = async(state) =>{
  try{
    console.log(state)
    return await axios.put(`${url}/updateprofile`,state)
  }
  catch (err){
    console.log(err, 'err in react api')
  }
}

// to check either user exist or not
export const userExist = async (user) => {
  try {
    return await axios.post(`${url}/ForgotPass`, user)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}


//to send mail to user
export const sendMail = async (user) => {
  try {
    return await axios.get(`${url}/sendmail?user=${user.email}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//check whether user is authentic or not to update password
export const authUser = async(credData) =>{
  try {
    return await axios.post(`${url}/confirmuser`, credData)
  } catch (error) {
  }
}


//to update password
export const setNewPassword = async(user) => {
  try {
    return await axios.get(`${url}/updatePassword?ps=${user.newPassword}&email=${user.email}`, user)
  } catch (error) {
    console.log(err, 'err in react api')
  }
}


//milestone 2 
//to fetch customer id
export const fetchCustomerIds = async()=>{
  try{
    return await axios.post(`${url}/fetchCusID`)
  }catch(err){
    console.log(err, 'err in react api')
  }
}
//Get Customers Details
export const CustomersDetails = async () => {
  try {
    return await axios.get(`${url}/customersdetails`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to get order details
export const OrderDetails = async () => {
  try {
    return await axios.get(`${url}/orderDetails`)
  } catch (err) {
    console.log(err, 'err in react api order detail')
  }
}

//to get only 10 latest orders details
export const latestOrderDetails = async () => {
  try {
    return await axios.get(`${url}/latestOrderDetails`)
  } catch (err) {
    console.log(err, 'err in react api order detail')
  }
}



//Get Access Token
export const getAccesstoken = async (data) => {
  try {
    return await axios.post(`${url}/getAccesstoken`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to filter data date wise in all orders
export const filterDates = async (data) => {
  try {
    return await axios.post(`${url}/filterDates`, data)
  } catch(err){
    console.log(err, 'err in react api')

  }
}
//to fetch  products data when user selec type for order


export const fetchProductdata = async (product) => {
  try {
    return await axios.post(`${url}/getproductdetails`, product)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to fetch  products options when user selec type for order

export const fetchProductOptions = async (code) => {
  try {
    return await axios.post(`${url}/getproductoptions`, code)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

// /Get Product Details
export const ProductsDetails = async () => {
  try {
    return await axios.get(`${url}/productsdetails`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}


//Get Cart Details
export const CartDetails = async () => {
  try {
    return await axios.get(`${url}/CartDetails`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}


//Place your order
export const CartOrder = async () => {
  try {
    return await axios.get(`${url}/cartorder`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//osrefValidation api
export const osrefValidation = async (osrefernce) =>{
  try{
    return await axios.post(`${url}/osrefValidation`,{'osrefernce':osrefernce})
  }
  catch (err) {
    console.log(err, 'err in react api')
  }
}

// //to get Product Variation
// export const ProductVariations = async (id) => {
//   try {
//     return await axios.get(`${url}/productvariations/${id}`)
//   } catch (err) {
//     console.log(err, 'err in react api')
//   }
// }

export const ProductVariationsById = async (id) => {
  try {
    return await axios.get(`${url}/ProductVariationsById/${id}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

export const changeLogDetail = async () => {
  try {
    return await axios.get(`${url}/changeLogDetail/`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to get user details
export const UpdataData = async (id,state) => {
  try {
    return await axios.put(`${url}/updateOrderData/${id}`,state)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}


//to get user details
export const CartOrderById = async (id) => {
  try {
    return await axios.get(`${url}/cartorderbyid/${id}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to get user details
export const ShippingAddress = async (id) => {
  try {
    return await axios.get(`${url}/shippingaddress/${id}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
// to remove product
export const RemoveProduct = async (product_id) => {
  try {
    return await axios.get(`${url}/remove_product/${product_id}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to get product variation

export const ProductVariations = async (id) => {
  try {
    return await axios.get(`${url}/productvariations/${id}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to get product variation

export const getProductSize = async (data) => {
  try {
    return await axios.post(`${url}/getproductsizes`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}


//to add product variation

export const AddVariation = async (data) => {
  try {
    return await axios.post(`${url}/addVarient`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to get product details
export const fetchProductDetails = async (data) => {
  try {
    return await axios.post(`${url}/getproductDetail`, data)
  }catch (err) {
    console.log(err, 'err in react api')
  }
}
// /Get variation Details
export const VariationDetails = async (data) => {
  
  try {
    return await axios.post(`${url}/variationdetails`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to store product data
export const storeProdcutdata = async (data) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Add any other custom headers here
      },
    };

    return await axios.put(`${url}/storeproduct`, data, config);
  } catch (err) {
    console.log(err, 'err in react api');
  }
};
//for delete variation
export const variationDelete = async (data) => {
  try {
    return await axios.post(`${url}/variationDelete`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to store product data
export const DeleteVariationID = async (data) => {
  try {
    return await axios.post(`${url}/deleteVariant`, data)
  }catch (err) {
    console.log(err, 'err in react api')
  }
}

// to store select data delete
export const SelectVariationDelete = async (data) => {
  console.log(data);
  try {
    return await axios.post(`${url}/selectVariantDelete`, data)
  }catch (err) {
    console.log(err, 'err in react api')
  }
} 
//for edit variation
export const variationEdit = async (selectedItem) => {
  try {
    return await axios.put(`${url}/variationEdit`, selectedItem)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to fetch variation details when user clicks from all products
export const fetchVariationData = async (id) => {
  try {
    return await axios.post(`${url}/fetchvariations`,id)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
export const CustomersDetailsData = async (id) => {
  try{
      return await axios.get(`${url}/getCustomersDetails/${id}`)
  }catch{
    console.log(err, 'err in react api')
  }
}
////////////////////////////////////////////////////
//jigar
//to fetch data order product data from the database
export const fetchOrderProductData = async (id) => {
  console.log(id);
  try {
    return await axios.post(`${url}/fetchorderproducts`, id)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
//to fetch cart product data
export const fetchcartproductData = async (id) => {
  try {
    return await axios.post(`${url}/fetchcartproductData`, id)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
////////////////////////////////////////////////////


//to fetch variation details when user clicks from all products
export const deleteCartOrder = async (data) => {
  try {
    return await axios.post(`${url}/deleteCartOrder`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to delete product and its all variations
export const deletePRoductwithVariation = async (id) => {
  try {
    return await axios.post(`${url}/deleteproductvariation`, id)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to delete product and its all variations
export const fetchEditProductDetails = async (id) => {
  try {
    return await axios.post(`${url}/fetcheditProductDetails`, id)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
//to delete product and its all variations
export const saveChangesLog = async (data) => {
  try {
    return await axios.post(`${url}/saveLogs`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
//to fetch logs of parcular order
export const fetchLogs = async (id) => {
  try {
    return await axios.post(`${url}/getlogs`, id)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
//to fetch logs of parcular order
export const updateCartProduct = async (data) => {
  try {
    return await axios.put(`${url}/updateCart`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to update product and its variation
export const updateProdctsVariation = async (data) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Add any other custom headers here
      },
    };

    return await axios.put(`${url}/updateProductVariation`, data, config);
  } catch (err) {
    console.log(err, 'err in react api');
  }
};

//to fetch order details when user clicks from all order
export const fetchOrderData = async (id) => {
  try {
    console.log("done");
    return await axios.post(`${url}/fetchorder`, id)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to fetch variation details when user clicks from all products
export const deleteOrderProduct = async (data) => {
  try {
    return await axios.post(`${url}/deleteOrderProduct`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to Show all variations for selected Customer
export const showProducts = async (CustID) => {
  console.log(CustID);
  try {
    return await axios.post(`${url}/showProducts`, CustID)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to Show all Product Group based on Category
export const selectCategory = async (CatID) => {
  try {
    return await axios.post(`${url}/selectCategory`, CatID)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to fetch color details when user clicks from all color groups
export const fetchColorData = async (id) => {
  try {
    return await axios.post(`${url}/fetchcolors`, id)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
//to store product data
export const DeleteColorID = async (data) => {
  try {
    return await axios.post(`${url}/deleteColor`, data)
  }catch (err) {
    console.log(err, 'err in react api')
  }
}

export const AddColorVariation = async (data) => {
  try {
    return await axios.post(`${url}/editcolors`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
//to save data from add new data
export const saveOrderData = async (data) => {
  try {
    return await axios.post(`${url}/SaveOrderData`, data)
  } catch (err) {
    console.log(err, 'err in react api')
   if(!err){
    console.warn("add to card");
   }
  }
}
//to place order
export const submitOrder = async (data) => {
  try {
    return await axios.post(`${url}/placeorder`, data)
  } catch (err) {placeorder
    console.log(err, 'err in react api')
  }
}

//to get Colour Data
export const getColourData = async () => {
  try {
    return await axios.get(`${url}/getColourData`)
  } catch (err) {
    console.log(err, 'err in react api order detail')
  }
}

//to viewdetails collecte
export const ViewDetails = async (data) => {
  try {
    console.log(data);
    return await axios.post(`${url}/ViewDetails`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

// to cart_order id
export const cartId = async (data) => {
  try {
    console.log(data);
    return await axios.post(`${url}/cartId`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

// to update placed order
export const updateDashboardData = async (data) => {
  try {
    return await axios.post(`${url}/updateDashboardData`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to get data of order to push in sage
export const fetchOrderDataToPush = async (data) => {
  try {
    return await axios.post(`${url}/fetchOrderDataToPush`, data)
  } catch (err) {
    console.log(err, 'err in react api order detail')
  }
}

//to push orders in sage
export const pushOrders = async (data) => {
  try {
    return await axios.post(`${url}/pushOrders`, data)
  } catch (err) {
    console.log(err, 'err in react api order detail')
  }
}

export const allOrderDelete = async (data) => {
  try {
    return await axios.post(`${url}/allOrderDelete`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}