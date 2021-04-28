let connection = require('../dao/connection-wrapper');
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");


//========================LOGIN Functions===========================

async function login(user){

    let SQL = "SELECT Id as userId, User_Type as userType, First_Name as firstName, Last_Name as lastName, City as city, Street as street FROM users WHERE User_Name =? && Password =?";
    let parameters = [user.username, user.password];

    try{
        let userLoginResult = connection.executeWithParameters(SQL , parameters);
        return userLoginResult;
    }
    
    catch(error){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
}



//========================REGISTER Functions===========================


//----Validations - User Name Already Exist----
async function isUserExistByName(data) {

    let sql = "SELECT * from users Where User_Name = ?";
    let parameters = [data.username];

    try {
        let userDetails = await connection.executeWithParameters(sql, parameters);


        if(userDetails.length == 0 || userDetails == null){
            return false;
        }

            return true;
        
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
}


//----Validations - User ID Already Exist----
async function isUserExistById(data) {

    let sql = "SELECT * from supermarketProject.Users Where User_Id = ?";
    let parameters = [data.userId];

    try {
        let userDetails = await connection.executeWithParameters(sql, parameters);

        if(userDetails.length == 0 || userDetails == null){

            return false;
        }

            return true;
        
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
}
//----Register - Add User----

async function addUser(user) {
    
    let sql = "INSERT INTO users (First_Name, Last_Name, User_Name, User_Id, Password, City, Street, User_Type)  values( ?, ?, ?, ?, ?, ?, ?, 'Client')";
    let parameters = [user.firstName, user.lastName, user.username, user.userId, user.password, user.city, user.street];

    try {
        let result = await connection.executeWithParameters(sql, parameters);
        return result;
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
}


module.exports = {login, isUserExistByName, addUser, isUserExistById}