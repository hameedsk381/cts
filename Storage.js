import multer from "multer";

const DIR = './public/';
const Storages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: function(req, file, cb) {   
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null,fileName); 
}});
// const fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if(allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Please upload image file'));
//     }
//   }
export const upload = multer({ storage:Storages,limits:{fileSize:1000000} });