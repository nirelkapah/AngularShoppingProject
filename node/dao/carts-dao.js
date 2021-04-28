let connection = require("./connection-wrapper");


async function getCartByUserId(userId) {

    let sql = "SELECT s.Id as id, p.Name as name ,p.Id as productId, p.Price as price , p.Image_URL as imageURL , s.Amount as amount , "+
    "s.Total_Price as totalPrice FROM ShoppingCartsProducts as s left Join Products as p "+
    "on s.Product_Id = p.Id JOIN ShoppingCarts as c on s.Cart_Id = c.Id where c.User_Id = ? && c.Is_Active = true "
    let parameters = [userId];
    try{
        let getCartByUserIdResult = await connection.executeWithParameters(sql, parameters);

        return getCartByUserIdResult;
    }
    catch(error){

        throw new ServerError(ErrorType.NO_CARTS_DATA);
    }
}

async function getCartHistoryByUserId(userId) {

    let sql = "SELECT s.Id as id, Date_Format(s.Creation_Date, '%d/%m/%Y') as creationDate , s.Is_Active as active ,SUM(p.Total_Price) as totalPrice "+
     "FROM supermarketProject.ShoppingCarts as s join supermarketProject.ShoppingCartsProducts as p on s.Id = p.Cart_Id "+
     "WHERE s.User_Id = ? group by s.id ;"
    

    let parameters = [userId];
    try{
        let getCartHistoryByUserIdResult = await connection.executeWithParameters(sql, parameters);
        return getCartHistoryByUserIdResult;

    }
    catch(error){
        throw new ServerError(ErrorType.NO_CARTS_DATA);
 
    }

}

async function checkIfUserCartExist(userId) {

    let sql = "SELECT Id as id FROM supermarketProject.ShoppingCarts WHERE User_Id = ? && Is_Active = true"
    

    let parameters = [userId];
    try{
        let checkIfUserCartExistResult = await connection.executeWithParameters(sql, parameters);
        return checkIfUserCartExistResult;
    }
    catch(error){
        throw new ServerError(ErrorType.NO_CARTS_DATA);
 
    }
}


async function createCart(userId) {

    let sql = "INSERT INTO ShoppingCarts (User_Id, Creation_Date, Is_Active) values( ? , curdate(), true); "
    let parameters = [userId];
    try{
        let result = await connection.executeWithParameters(sql, parameters);
        return result;
    }
    catch(error){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
 
    }
    
}

async function addProductToCart(data) {

    let sql = "INSERT INTO supermarketProject.ShoppingCartsProducts (Product_Id, Amount , Total_Price , Cart_Id )  values(? ,? ,? ,? ); "
    let parameters = [data.productId , data.amount , data.totalPrice , data.cartId];

    try{
        let result = await connection.executeWithParameters(sql, parameters);
        return result;
    }
    catch(error){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
 
    }
    
}

async function deleteProductFromCart(cartProductId) {

    let sql = "DELETE FROM ShoppingCartsProducts WHERE Id = ?"
    let parameters = [cartProductId];

    try{
        let result = await connection.executeWithParameters(sql, parameters);
        return result;
    }
    catch(error){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
 
    }
    
}

async function deleteAllProductFromCart(cartId) {

    let sql = "DELETE FROM ShoppingCartsProducts WHERE Cart_Id = ?"
    let parameters = [cartId];

    try{
        let result = await connection.executeWithParameters(sql, parameters);
        return result;
    }
    catch{
        throw new ServerError(ErrorType.NO_CARTS_DATA);
    }

    
}


async function deleteCartByUserId(data) {
    let sql = "DELETE FROM ShoppingCarts WHERE User_Id = ? AND Is_Active = true"
    let parameters = [data.userId];

    try{
        let result = await connection.executeWithParameters(sql, parameters);
        return result; 
    }
    catch{
        throw new ServerError(ErrorType.NO_CARTS_DATA);
    }
}

async function setCartUnActive(data) {
    let sql = "UPDATE supermarketProject.ShoppingCarts SET Is_Active = false WHERE User_Id = ? AND Is_Active = true"
    
    let parameters = [data.userId];
    try{
        let result = await connection.executeWithParameters(sql, parameters);
        return result;
    }
    catch{
        throw new ServerError(ErrorType.NO_CARTS_DATA);
    }
    
}







module.exports = {
    getCartByUserId,
    checkIfUserCartExist,
    createCart,
    addProductToCart,
    deleteProductFromCart,
    deleteAllProductFromCart,
    deleteCartByUserId,
    setCartUnActive,
    getCartHistoryByUserId
};

