const express = require('express');
const { Auth, isAdmin } = require('../middleware/auth');
const multer = require('multer');
const upload = multer();
const {
    hello,
    products,
    singleProduct,
    findProduct,
    usersLogin,
    signup,
    Order,
    userAuth,
    OrderDetails,
    OrderHistory,
    update,
    OrderSummery,
    productsList,
    createProduct,
    uploadFile,
    deleteProduct,
    deleteImage,
    orderList,
    deleteOrder,
    userList,
    deleteUser,
    userDetail,
    editUserDetail,
    categories,
    logout,
} = require('./Controllers');

const Router = express.Router();

Router.get('/', hello);
Router.get('/auth', Auth, userAuth);
Router.get('/products', products);
Router.get('/product/slug/:slug', singleProduct);
Router.get('/product/:id', findProduct);
Router.post('/users/login', usersLogin);
Router.get('/user/logout', logout);
Router.post('/users/signup', signup);
Router.put('/user/update', Auth, update);
Router.post('/order', Auth, Order);
Router.get('/order/history', Auth, OrderHistory);
Router.get('/order/:id', Auth, OrderDetails);
Router.get('/orders/summary', Auth, isAdmin, OrderSummery);
Router.get('/products/admin', Auth, isAdmin, productsList);
Router.post(
    '/product/createProduct',
    Auth,
    isAdmin,
    upload.single('file'),
    createProduct
);
Router.delete('/product/delete/:id', Auth, isAdmin, deleteProduct);
Router.get('/orders/orderList', Auth, isAdmin, orderList);
Router.delete('/orders/deleteOrder/:id', Auth, isAdmin, deleteOrder);
Router.get('/user/userList', Auth, isAdmin, userList);
Router.delete('/user/deleteUser/:id', Auth, isAdmin, deleteUser);
Router.get('/user/:id', Auth, isAdmin, userDetail);
Router.put('/userEdit/:id', Auth, isAdmin, editUserDetail);
module.exports = Router;