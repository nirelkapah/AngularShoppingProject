let reservationsDao = require('../dao/reservations-dao');
let cartsDao = require('../dao/carts-dao');
const formValidatorsUtils = require('../utls/FormValidatorsUtils');





async function countReservations(){
    
    let countReservationsResult = await reservationsDao.countReservations();
    return (countReservationsResult)
}

async function getOccupiedDates(){
    
    let getOccupiedDatesResult = await reservationsDao.getOccupiedDates();
    return (getOccupiedDatesResult)
}


async function addReservation(userId, data){

    try{

        //get CartId By User Id
        let cartInfo = await cartsDao.checkIfUserCartExist(userId);
        let cartId = cartInfo[0].id;

        //calculate Final Price On Server
        let finalPrice = await getFinalPrice(userId)

        //validations
        let ocuppiedDates = await reservationsDao.getOccupiedDates();
        formValidatorsUtils.validateCheckoutFormFields(data, ocuppiedDates)

        //set data
        data.userId = userId;
        data.cartId = cartId;
        data.finalPrice = finalPrice;



        //add Reservation
        let addReservationResult = await reservationsDao.addReservation(data);
        return (addReservationResult);
    }
    catch(error){
        return error;
    }
    



}

async function getFinalPrice (userId){

    try{
        let cart = await cartsDao.getCartByUserId(userId);
    
        let finalPrice = 0;

        for(let i = 0; i < cart.length ; i++){
            finalPrice = finalPrice +  cart[i].totalPrice;
        }
        return finalPrice;
    }
    catch(error){
        return error
    }

}






module.exports = {
countReservations,
getOccupiedDates,
addReservation,
};
