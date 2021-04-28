let productsDao = require('../dao/products-dao');
const formValidatorsUtils = require('../utls/FormValidatorsUtils');



async function getAllProducts(){
    
    let getAllProductsResult = await productsDao.getAllProducts();
    return (getAllProductsResult)
}


async function getAllProductsCategories(){
    
    let getAllProductsCategoriesResult = await productsDao.getAllProductsCategories();
    return (getAllProductsCategoriesResult)
}


async function getProductsByCategory(categoryId){
    
    let getProductsByCategoryResult = await productsDao.getProductsByCategory(categoryId);
    return (getProductsByCategoryResult)
}


async function getProductsByKeyword(keyword){
    let getProductsByKeywordResult = await productsDao.searchProductsByKeyword(keyword);
    return (getProductsByKeywordResult)
}


async function countProducts(){
    
    let countProductsResult = await productsDao.countProducts();
    return (countProductsResult)
}

async function editProduct(product){
    formValidatorsUtils.validateUpdateProductFields(product)
    let editProductResult = await productsDao.editProduct(product);
    return (editProductResult)
}

async function addProduct(product){
    formValidatorsUtils.validateAddProductFields(product)
    let addProductResult = await productsDao.addProduct(product);
    return (addProductResult)
}


module.exports = {
getAllProducts,
getAllProductsCategories,
getProductsByCategory,
getProductsByKeyword,
countProducts,
editProduct,
addProduct
};
