import express from "express";
import Image from "../models/imageModel.js";
import multer from "multer";


export const imageRoute = express.Router();
const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
// Image model

imageRoute.post(
  "/upload-images",
  upload.array("imgCollection"),
  (req, res, next) => {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/public/" + req.files[i].filename);
    }
    const user = new Image({
      imgCollection: reqFiles,
    });
    user
      .save()
      .then((result) => {

        res.status(201).json({
          Imagelist: result.files,
        });
      })
      .catch((err) => {
    
        res.status(500).json({
          error: err,
        });
      });
  }
);
imageRoute.get("/", (req, res, next) => {
  Image.find().then((data) => {
    res.status(200).json(data[0].imgCollection);
  });
});
