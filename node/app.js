//=====================import=====================//
const express = require("express");
const server = express();


//----------cors---------//
const cors = require('cors');

//----------middlewares------//
const errorHandler = require("./errors/error-handler");
const loginFilter = require('./middleware/login-filter');


//----------multer - file upload ------//
const uploadHandler = require('./utls/upload-handler')

//----------controllers---------//
const usersController = require('./controllers/users-controller');
const reservationsController = require('./controllers/reservations-controller');
const productsController = require('./controllers/products-controller');
const cartsController = require('./controllers/carts-controller');

//===============================ON SERVER START =============================


//set a public static Folder - for file uploads
server.use(express.static('./public'))

//Use Cors
server.use(cors({ origin: "http://localhost:4200", credentials: true
}));

server.use(express.static(__dirname)); //serves index.html


//Use Login Filter
server.use(loginFilter());

//Use JSON On Data
server.use(express.json());

//Listen On Port
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log('Listening on ' + PORT));


//===============================On Post Data ( data / admin / vacations) =============================//

server.use('/upload',uploadHandler);

server.use('/users',usersController);
server.use('/reservations',reservationsController);
server.use('/products',productsController);
server.use('/carts',cartsController);



server.use(errorHandler);

//===============================Register Socket IO =============================//
