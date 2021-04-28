const userDao = require('../dao/users-dao');
const ServerError = require('../errors/server-error');
const ErrorType = require('../errors/error-type');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const serverCache = require('../models/serverCache')
const config = require('../config.json')
const formValidatorsUtils = require('../utls/FormValidatorsUtils');



//========================LOGIN Functions===========================
//--Login---
async function login(user){


    formValidatorsUtils.validateLoginInputFields(user);

    //>>>>>>>>>>>>>>>>>>>
    // get Hashed Password
    let hashedPassword = hashPassword(user.password);
    user.password = hashedPassword;

    //Send Data and get a Response (userLoginData)
    let userLoginData = await userDao.login (user);
    //<<<<<<<<<<<<<<<<<<<

    //if Response is Empty Or Undefined Return Error
    if (userLoginData == undefined || userLoginData.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    //if Response is Valid Return Data
    let username = user.username;
    let userType = userLoginData[0].userType;
    let userId = userLoginData[0].userId;
    let firstName = userLoginData[0].firstName;
    let city = userLoginData[0].city;
    let street = userLoginData[0].street;


    //Generate Token
    let token = generateToken(username);

    //Export Token and Data To Server Cache
    exportTokenToServerCache(token, username, userType, userId , city , street );

    //Set Response
    let clientResponseData = {
        token: token,
        firstName: firstName,
        userType: userType,
        userId: userId,
        city: city,
        street: street
    }
    return (clientResponseData)


}


//========================REGISTER Functions===========================

//--Add User---
async function addUser(user) {
    formValidatorsUtils.validateRegisterInputFields(user);


    //Hash Password
    let hashedPassword = hashPassword(user.password);
    user.password = hashedPassword;

    //Send Data
    let result = await userDao.addUser(user);
    return result;
}


//========================AUTHENTICATE Functions===========================


//--Check If User Exist---
async function isUserExist(data) {

    formValidatorsUtils.validateCheckIfUserExistFields(data);
    //Is User Exist By Id
    
    if (await userDao.isUserExistById(data)){
    throw new ServerError(ErrorType.USER_ID_ALREADY_EXIST);
    }

    //Is User Exist By Name
    if (await userDao.isUserExistByName(data)){
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    }

    return false;
}

//--authenticate user type ---
async function authenticate(userType){

    if(userType == undefined || userType == null){
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    else{
        return (userType)
    }
}





//========================GENERAL Functions===========================

function hashPassword(password){
    let saltedPassword = "hjifh#$"+password+"543643";
    let hashedPassword = crypto.createHash('md5').update(saltedPassword).digest('hex');
    return hashedPassword;
}

function generateToken(username){
    let saltedUsername = "dfs$w"+username+"drw53@2";
    let token = jwt.sign({sub: saltedUsername}, config.secret);
    return token;
}

function exportTokenToServerCache(token, username, userType, userId , city , street){
    serverCache.set(token, {
        username: username,
        userType: userType,
        userId: userId,
        city: city,
        street: street
    });
}

const extractUserFromCache = (req) => {
    let authorizationString = req.headers['authorization'];
    let token = authorizationString.substring('Bearer '.length);
    let userCacheData = serverCache.get(token);

    return userCacheData;
}


module.exports = {
login,
addUser,
authenticate,
isUserExist};
