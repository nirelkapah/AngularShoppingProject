const mySQL = require ('mysql2');

const connection = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "supermarketProject"
});

connection.connect( error => {
    if(error){
        console.log("Failed To Create Connection: " + error);
        return;
    }
    console.log("You Are Connected To MySQL!");
});

// One function for executing select / insert / update / delete: 
function execute(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                // console.log("Error " + err);
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

function executeWithParameters(sql, parameters) {
    return new Promise((resolve, reject) => {
        connection.query(sql, parameters, (err, result) => {
            if (err) {
                //console.log("Error " + err);
                console.log("Failed interacting with DB, calling reject");
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    executeWithParameters,
    execute
};