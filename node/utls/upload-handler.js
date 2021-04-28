
const express = require('express');
const multer = require('multer');
const router = express.Router();
const ServerError = require('../errors/server-error');
const ErrorType = require('../errors/error-type');




//===Use File Filter To Check Uploaded Data Type====//

function fileFilter(req, file, cb){
    const extension = file.mimetype.split('/')[0];

        if(extension !== 'image'){
            
            return cb(new ServerError(ErrorType.INVALID_FILE_TYPE_UPLOADED), false);
        }
        cb(null, true);
};

//==================Set Storage=================//

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
 cb(null, './public')
 },
 filename: function (req, file, cb) {
 cb(null, file.originalname)
 },

})

//==================Set File Upload===============//

const upload = multer({ storage: storage, fileFilter: fileFilter }).single('file')


//====================Post File====================//

router.post('/',function(request, response, next) {
    upload(request, response, function (error) {

    //IF AN ERROR WAS THROWN
    if (error instanceof multer.MulterError) {
        console.log(error);
        return next(error);
 
    } else if (error) {
        console.log(error);
        return next (error);
    }  
    //ELSE
        return response.status(200).send(request.file)
})
});


module.exports = router;
