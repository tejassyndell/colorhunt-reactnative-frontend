/* eslint-disable */
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Cart = React.lazy(() => import('./views/cart/index'))
const Profile = React.lazy(() => import('./views/profile'))
const Users = React.lazy(() => import('./views/users/allusers'))
const AddUser = React.lazy(() => import('./views/users/adduser'))
const EditUser = React.lazy(() => import('./views/users/edituser'))
const Test = React.lazy(() => import('./views/users/Test'))
const AllOrders =  React.lazy(() => import('./views/orders/AllOrders'))

const AddOrder = React.lazy(() => import('./views/orders/AddOrder'))
const ViewOrders = React.lazy(() => import('./views/orders/viewOrders'))
// const ViewOrders = React.lazy(() => import('./views/orders/viewOrder'))
// const PlaceOrder = React.lazy(()=> import('./views/orders/PlaceOrder'))
const PlaceOrders = React.lazy(()=> import('./views/orders/PlaceOrders'))
const Customers = React.lazy(() => import('./views/customers/all-customers'))

const Customer = React.lazy(() => import('./views/customer/allCustomer'))

const Product = React.lazy(() => import('./views/product/allProduct'))
const CreateProduct = React.lazy(() => import('./views/product/CreateProduct/createProduct'))

const ConnectSage = React.lazy(() => import('./views/pages/sage/connectSage'))
// const createVariant = React.lazy(() => import('./views/product/variations/addCategory'))
// const createVariant = React.lazy(() => import('./views/product/variations/addVariation'))
const viewVariant = React.lazy(() => import('./views/product/variations/viewVariation'))
const viewColor = React.lazy(() => import('./views/product/variations/viewColor'))
const productVariation = React.lazy(()=> import ('./views/product/productVariation'))
const CustomersProducts = React.lazy(()=> import ('./views/customer/CustomersProducts.js'))
const editProduct = React.lazy(()=> import('./views/product/CreateProduct/editProduct'))
const GetToken = React.lazy(()=> import('./views/pages/sage/getToken'))






const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/profile', name: 'Profile', element: Profile },
  { path: '/cart', name: 'Cart', element: Cart },
  { path: '/all-users', name: 'Users / All Users', element: Users },
  // { path: '/user/test', name: 'User / All Users', element: Users },
  { path: '/test2', name: 'User / All Users', element: Users },
  { path: '/add-new-user', name: 'Users / Add New User', element: AddUser },
  { path: '/all-orders', name: 'Orders / All Orders', element: AllOrders },
  { path: '/add-new-order', name: 'Orders / Add New Order', element: AddOrder },
  { path: '/view-order', name: 'View Order', element: ViewOrders },
  { path: '/view-order/:id', name: 'View Order', element: ViewOrders },
  // { path: '/place_order', name: 'Orders / Place Order', element: PlaceOrders },
  // { path: '/place_order/:id', name: 'Orders / Place Order', element: PlaceOrder },
  { path: '/place-order/:id', name: 'Orders / Place Order', element: PlaceOrders },
  // { path: '/user/test', name: 'User / All Users', element: Users },
  // { path: '/test2', name: 'User / All Users', element: Users },
  { path: '/add-user', name: 'Users / Add New User', element: AddUser },
  { path: '/edit-user/:ID', name: 'Users / Edit User', element: EditUser },
  { path: '/all-customers', name: 'Customers / All Customers', element: Customers },
  { path: '/users/all-users', name: 'User / All Users', element: Users },
  { path: '/user/add-user', name: 'Users / Add New User', element: AddUser },
  { path: '/user/edit-user/:ID', name: 'Users / Edit User', element: EditUser },
  { path: '/customer', name: 'Customer', element: Customer },
  { path: '/connectSage', name: 'sage / ConnectSage', element: ConnectSage },
  { path: '/getToken', name: 'GetToken', element: GetToken },


  { path: '/products/all-products', name: 'Product / All Product', element: Product },
  { path: '/add-product', name: 'Product / Add Product', element: CreateProduct },
  // { path: '/add_variant', name: 'Product / Add Product', element: createVariant },
  // { path: '/add-variant', name: 'Product / Create New Variation', element: createVariant },
  { path: '/view-variation', name: 'Product / View Variation', element: viewVariant },
  { path: '/color-variants/:id', name: 'Product / View Variation', element: viewColor },
  { path: '/product-variations/:id', name: 'All Products / Product Variations', element: productVariation },
  { path: '/all-customers/customers-products/:id', name: 'Customers products', element: CustomersProducts },
  { path: 'all-products/product-variations', name: 'All Products / Product Variations', element: productVariation },
  { path: 'products/all-products/edit-product/:id', name: 'All Products / Edit Product', element: editProduct },
]

export default routes
