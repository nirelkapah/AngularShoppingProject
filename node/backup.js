
//MULTER -- Upload Files
//set a public static Folder - for file uploads
server.use(express.static('./public'))

//creating storage
let storage = multer.diskStorage({
//wrote it differently then the video - destination: './public/uploads/', filename..
 destination: function (req, file, cb) {
//YOUR PATH IN GREEN - cb=callback
 cb(null, '../node/public/uploads')
 },
 filename: function (req, file, cb) {
 cb(null, file.originalname)
 // cb(null, Date.now() + '-' +file.originalname )
 }
})

let upload = multer({ storage: storage }).single('file')
server.post('/upload',function(request, response) {
 upload(request, response, function (error) {
 if (error instanceof multer.MulterError) {
 console.log(error);
 return;
 } else if (error) {
 console.log(error);
 return;
 }
 return response.status(200).send(request.file)
 })
 });
