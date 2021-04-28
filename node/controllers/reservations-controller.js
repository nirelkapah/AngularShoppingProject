const express = require('express')
const reservationsLogic = require('../logic/reservations-logic')
const router = express.Router();
let extractUserFromCache = require('../utls/extractUserFromCache');



// Count Reservations
router.get("/", async (req, res, next) => {

    try {
        let countReservationsResult = await reservationsLogic.countReservations();
        res.json(countReservationsResult);
    }
    catch (error) {
        return next(error);
    }
});

router.get("/getOccupiedDates", async (req, res, next) => {

    try {
        let getOccupiedDatesResult = await reservationsLogic.getOccupiedDates();
        res.json(getOccupiedDatesResult);
    }
    catch (error) {
        return next(error);
    }
});


// add Reservation 
router.post("/", async (req, res, next) => {

    try {
        //get User Id By Token
        let userData = extractUserFromCache(req);
        let userId = userData.userId;
        //set Data
        let data = req.body;

        let addReservationResult = await reservationsLogic.addReservation(userId, data);
        res.json(addReservationResult);
    }
    catch (error) {
        return next(error);
    }

});



module.exports = router;



