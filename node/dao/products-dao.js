let connection = require("./connection-wrapper");


async function getAllProducts() {

    let sql = "SELECT P.Id as id , P.Name as name , P.Category_Id as categoryId, P.Price as price , P.Image_URL as imageURL FROM supermarketProject.Products as P"
    
    try{
        let getAllProductsResult = await connection.execute(sql);
        return getAllProductsResult;
    }
    catch(error){
        throw new ServerError(ErrorType.NO_PRODUCTS_DATA)
    }

}

async function getCertainProductById(productId) {

    let sql = "SELECT P.Id as id , P.Name as name , P.Category_Id as categoryId, "+
    "P.Price as price , P.Image_URL as imageURL FROM supermarketProject.Products as P WHERE P.Id= ?"
    

    let parameters = [productId];
    try{
        let getCertainProductByIdResult = await connection.executeWithParameters(sql, parameters);
        return getCertainProductByIdResult[0];
    }
    catch(error){
        throw new ServerError(ErrorType.NO_PRODUCTS_DATA)
    }
}

async function getAllProductsCategories() {

    let sql = "SELECT P.Id as id , P.Name as name  FROM supermarketProject.ProductsCategories as P"
    
    try{

        let getAllProductsCategoriesResult = await connection.execute(sql);
        return getAllProductsCategoriesResult;
    }
    catch(error){
        throw new ServerError(ErrorType.NO_PRODUCTS_DATA)
    }
}

async function getProductsByCategory(categoryId) {

    let sql = "SELECT P.Id as id , P.Name as name , P.Category_Id as categoryId, "+
    "P.Price as price , P.Image_URL as imageURL FROM supermarketProject.Products as P WHERE P.Category_Id= ?"
    

    let parameters = [categoryId];

    try{
        let getProductsByCategoryResult = await connection.executeWithParameters(sql, parameters);
        return getProductsByCategoryResult;
    }
    catch(error){
        throw new ServerError(ErrorType.NO_PRODUCTS_DATA)
    }
}


async function searchProductsByKeyword (keyword) {

    keyword = "%" + keyword + "%"
    let sql = "SELECT P.Id as id , P.Name as name , P.Category_Id as categoryId, P.Price as price , P.Image_URL as imageURL FROM supermarketProject.Products as P WHERE P.Name Like ?"
    

    let parameters = [keyword];
    try{
        let searchProductsByKeywordResult = await connection.executeWithParameters(sql, parameters);
        return searchProductsByKeywordResult;
    }
    catch(error){
        throw new ServerError(ErrorType.NO_PRODUCTS_DATA)
    }
}

async function countProducts() {

    let sql = "SELECT count(*) FROM supermarketProject.Products"
    
    try{
        let countProductsResult = await connection.execute(sql);
        return countProductsResult;
    }
    catch(error){
        throw new ServerError(ErrorType.NO_PRODUCTS_DATA)
    }
}

async function editProduct(product) {

    let sql = 
    "UPDATE supermarketProject.Products SET Name = ? " +
    " , Category_Id = ? , Price = ?, Image_URL = ? WHERE Id = ?"

    let parameters = [product.name, product.categoryId, product.price ,
         product.imageURL, product.id];

    try{
        let editProduct = await connection.executeWithParameters(sql, parameters);
        return editProduct;
    }
    catch(error){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }

}

async function addProduct(product) {

    let sql = 
    "INSERT INTO supermarketProject.Products (Name, Category_Id , Price , Image_URL)  values (? ,? ,? , ?)"

    let parameters = [product.name, product.categoryId, product.price ,
         product.imageURL];
    try{
        let editProduct = await connection.executeWithParameters(sql, parameters);
        return editProduct;
    }
    catch(error){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
}





module.exports = {
    getAllProducts,
    countProducts,
    getAllProductsCategories,
    getProductsByCategory,
    searchProductsByKeyword,
    getCertainProductById,
    editProduct,
    addProduct};

