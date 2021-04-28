const express = require('express')
const cartsLogic = require('../logic/carts-logic')
const router = express.Router()
let extractUserFromCache = require('../utls/extractUserFromCache');



// Get Cart Products
router.get("/", async (req, res, next) => {

    try {
        //get User Id By Token
        let userData = extractUserFromCache(req)
        let userId = userData.userId

        let getCartByUserIdResult = await cartsLogic.getCartByUserId(userId);
        res.json(getCartByUserIdResult);
    }
    catch (error) {
        return next(error);
    }
});

// Get Cart History
router.get("/history", async (req, res, next) => {

    try {

        //get User Id By Token
        let userData = extractUserFromCache(req)
        let userId = userData.userId

        let getCartHistoryByUserId = await cartsLogic.getCartHistoryByUserId(userId);
        res.json(getCartHistoryByUserId);
    }
    catch (error) {
        return next(error);
    }
});

// add Product To Cart
router.post("/", async (req, res, next) => {

    try {
        //get User Id By Token
        let userData = extractUserFromCache(req);
        let userId = userData.userId;
        //get Data
        let data = req.body;


        let addProductToCartResult = await cartsLogic.addProductToCart(userId, data);
        res.json(addProductToCartResult);
    }
    catch (error) {
        return next(error);
    }

});


// Delete Single Product From Cart
router.delete("/deleteProduct", async (req, res, next) => {

    try {
        let productId = req.query.cartProductId;

        let deleteProductFromCartResult = await cartsLogic.deleteProductFromCart(productId);
        res.json(deleteProductFromCartResult);
    }
    catch (error) {
        return next(error);
    }

});

// Delete All Products From Cart
router.delete("/deleteAllProducts", async (req, res, next) => {

    try {
        //get User Id By Token
        let userData = extractUserFromCache(req);
        let userId = userData.userId;

        let deleteAllProductsFromCartResult = await cartsLogic.deleteAllProductsFromCart(userId);
        res.json(deleteAllProductsFromCartResult);
    }
    catch (error) {
        return next(error);
    }

});

// Delete Cart
router.delete("/", async (req, res, next) => {

    try {
        //get User Id By Token
        let userData = extractUserFromCache(req);
        let userId = userData.userId;

        let deleteCartResult = await cartsLogic.deleteCartByUserId(userId)
        res.json(deleteCartResult);
    }
    catch (error) {
        return next(error);
    }

});

// Set Cart Unactive
router.get("/setUnActive", async (req, res, next) => {

    try {

        //get User Id By Token
        let data = extractUserFromCache(req);

        let setCartUnActive = await cartsLogic.setCartUnActive(data)
        res.json(setCartUnActive);
    }
    catch (error) {
        return next(error);
    }

});



module.exports = router;



