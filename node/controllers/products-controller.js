const express = require('express')
const productsLogic = require('../logic/products-logic')
const router = express.Router()


// GET All Products
router.get("/", async (req, res, next) => {

    try {
        let getAllProductsResult = await productsLogic.getAllProducts();
        res.json(getAllProductsResult);
    }
    catch (error) {
        return next(error);
    }

});

// GET All Product Categories
router.get("/allCategories", async (req, res, next) => {

    try {
        let getAllProductsCategoriesResult = await productsLogic.getAllProductsCategories();
        res.json(getAllProductsCategoriesResult);
    }
    catch (error) {
        return next(error);
    }

});


// Count Products
router.get("/countProducts", async (req, res, next) => {

    try {
        let countProductsResult = await productsLogic.countProducts();
        res.json(countProductsResult);
    }
    catch (error) {
        return next(error);
    }
});

//Get Products By Category Id
router.get("/byCategoryId", async (request, response, next) => {

    // Extracting the JSON from the packet's BODY
    let categoryId = request.query.categoryId;

    try {
        let products = await productsLogic.getProductsByCategory(categoryId);
        response.json(products);
    }
    catch (error) {
        return next(error);
    }
});


// Search Product
router.get("/byKeyword", async (req, res, next) => {
    
    // Extracting the JSON from the packet's BODY
    let keyword = req.query.keyword;

    try {
        // let keyword = req.body.keyword

        let searchResult = await productsLogic.getProductsByKeyword(keyword);
        res.json(searchResult);
    }
    catch (error) {
        return next(error);
    }

});

router.put("/", async (request, response, next) => {
    let product = request.body;

    try {
        let updateProductResult = await productsLogic.editProduct(product);
        response.json(updateProductResult);
    }
    catch (error) {
        return next(error);
    }
});

router.post("/", async (request, response, next) => {
    let product = request.body;

    try {
        let addProductResult = await productsLogic.addProduct(product);
        response.json(addProductResult);
    }
    catch (error) {
        return next(error);
    }
});



module.exports = router;



