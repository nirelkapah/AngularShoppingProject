let cartsDao = require('../dao/carts-dao');
let productsDao = require('../dao/products-dao');
const formValidatorsUtils = require('../utls/FormValidatorsUtils');

async function getCartByUserId(userId){
    
    let getCartByUserIdResult = await cartsDao.getCartByUserId(userId);
    return (getCartByUserIdResult)
}

async function getCartHistoryByUserId(userId){

    let getCartHistoryByUserIdResult = await cartsDao.getCartHistoryByUserId(userId);
    return (getCartHistoryByUserIdResult)
}

async function addProductToCart(userId, data){

    try{

        //Check if Cart Already Exist
        let cartInfo = await cartsDao.checkIfUserCartExist(userId);

        if(cartInfo.length == 0 || cartInfo == undefined || cartInfo == null){

            //Create Cart
            let createCartResult = await cartsDao.createCart(userId);

            //Get Cart Id
            cartInfo = await cartsDao.checkIfUserCartExist(userId);
        }

            //Set Data
            let cartId = cartInfo[0].id;
            formValidatorsUtils.validateAmountField(data)

            let dbProductInfo = await productsDao.getCertainProductById(data.productId)
            let productForCart =  createProductForCart(dbProductInfo.price, data, cartId)
            
            //add Product To Cart
            let addProductToCartResult = await cartsDao.addProductToCart(productForCart);
            return (addProductToCartResult);
    }
    catch(error){
        return error;
    }
    
}


async function deleteProductFromCart(cartProductId){
    
    let deleteProductFromCartResult = await cartsDao.deleteProductFromCart(cartProductId);
    return (deleteProductFromCartResult)
}


async function deleteAllProductsFromCart(userId){

    try{

        //get Cart Id
        let cartInfo = await cartsDao.checkIfUserCartExist(userId);
        let cartId = cartInfo[0].id

        //Delete All Products From Cart
        let deleteAllProductsFromCartResult = await cartsDao.deleteAllProductFromCart(cartId);
        return deleteAllProductsFromCartResult;
    }
    catch(error){
        return error;
    }
    
}

async function deleteCartByUserId(userId){

    //Delete Cart
    let deleteCartResult = await cartsDao.deleteCartByUserId({userId});
    return deleteCartResult;
        
    
}

async function setCartUnActive (data){

    //set Cart UnActive
    let setCartUnActiveResult = await cartsDao.setCartUnActive(data);
    return setCartUnActiveResult;
    
}

//==================== General Functions ===============


let createProductForCart = (price ,data, cartId) => {

    let amount = data.amount;
    let productId = data.productId;
    let totalPrice = (price * amount);

    let newProduct = {cartId, amount, productId, totalPrice}
    return newProduct;
}


module.exports = {
    getCartByUserId,
    addProductToCart,
    deleteProductFromCart,
    deleteAllProductsFromCart,
    deleteCartByUserId,
    setCartUnActive,
    getCartHistoryByUserId
};
