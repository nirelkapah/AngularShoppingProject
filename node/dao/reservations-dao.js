let connection = require("./connection-wrapper");



async function countReservations() {

    let sql = "SELECT count(*) FROM supermarketProject.Reservations"
    
    try{
        let countReservationsResult = await connection.execute(sql);
        return countReservationsResult;
    }

    catch (error) {
        throw new ServerError(ErrorType.NO_ORDERS_DATA);
    }
}

async function getOccupiedDates() {

    let sql = "SELECT Delivery_Date as deliveryDate FROM supermarketProject.Reservations Group By Delivery_Date HAVING COUNT (Delivery_Date) >2 "
    
    try{
        let occupiedDatesResult = await connection.execute(sql);
        return occupiedDatesResult;
    }
    catch (error) {
        throw new ServerError(ErrorType.NO_ORDERS_DATA);
    }
}


async function addReservation(data) {

    let sql = "INSERT INTO supermarketProject.Reservations (User_Id, Cart_Id , Final_Price , City , Street , Reservation_Date , Delivery_Date , Payment )  values (? ,? ,? , ?, ? , curdate(), ? , ? ) ;"
    let parameters = [data.userId , data.cartId , data.finalPrice , data.city, data.street, data.shippingDate, data.creditCard];

    try{
        let result = await connection.executeWithParameters(sql, parameters);
    
        return result;
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
    
}


module.exports = {
    countReservations,
    getOccupiedDates,
    addReservation,
};

