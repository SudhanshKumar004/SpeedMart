const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
            cb(null, 'uploads/') //file will be saved in upload directory
    },

    filename:(req, file, cb)=>{
            cb(null, Date.now()+"-"+file.originalname); //for original name
    }
})

const fileFilter = (req,file,cb) =>{
       const allowedFileTypes = /jpeg|jpg|png|pdf/;
       const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
       const mimetype = allowedFileTypes.test(file.mimetype);

        if (extname && mimetype) {
         cb(null, true);
       } else {
         cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'));
       }
}
const upload = multer({
        storage:storage,
        fileFilter:fileFilter,
        limits: { fileSize: 5 * 1024 * 1024 }     
});


module.exports = upload
