const express = require('express');
const usersLogic = require('../logic/users-logic');
let extractUserFromCache = require('../utls/extractUserFromCache');



const router = express.Router()

//Login
router.post('/', async (req, res, next) => {

    try{
        let user = req.body;

        let succesfulLoginData = await usersLogic.login(user);
        res.json(succesfulLoginData);
    }
    catch(error){
        return next(error);
    }
})

// ADD USER
router.post("/register", async (req, res, next) => {

    try {
        // Extracting the JSON from the packet's BODY
        let userId = req.body;

        let succesfulLoginData = await usersLogic.addUser(userId);
        res.json(succesfulLoginData);
    }
    catch (error) {
        return next(error);
    }
});


// Check If User Exist (for register)
router.post("/checkUserExist", async (req, res, next) => {


    try {

        // Extracting the JSON from the packet's BODY
        let data = req.body;

        let succesfulLoginData = await usersLogic.isUserExist(data);
        res.json(succesfulLoginData);
    }
    catch (error) {
        return next(error);
    }
});

// Authenticate USER
router.get('/authenticate', async (req, res, next) => {


    try{
        let userType = "";
        let userData = extractUserFromCache(req);
        if(userData){
            userType = userData.userType;
        }

        let succesfulAuthenticateData = await usersLogic.authenticate(userType);
        res.json(succesfulAuthenticateData);
    }
    catch(error){
        return next(error);
    }
})

module.exports = router;



