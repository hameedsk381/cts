import express from "express";
import {
  deleteUser,
  getProfilePic,
  getUser,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
 
} from "../controllers/userControllers.js";
import User from "../models/userModel.js";
import fs from "fs";

import { upload } from "../Storage.js";

const userRoute = express.Router();

userRoute.post("/register", upload.single("profileimg"), registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/getusers", getUsers);
userRoute.put("/update", updateUser);
userRoute.get("/:id", getUser);
userRoute.delete("/deleteuser/:id", deleteUser);
userRoute.post("/uploadprofilepic", upload.single("profile"), (req, res) => {
  const { _id } = req.body;

  try {
    const user = User.findByIdAndUpdate(
      _id,
      {
        image: {
          data: fs.readFileSync("images/" + req.file.filename),
          contentType: req.file.mimetype,
        },
      },
      () => {
   
      }
    );

    res.status(200).send({ message: "profile picture updated" });
  } catch (err) {

    res.status(400).json({ message: err });
  }
});
userRoute.post("/getprofilepic", getProfilePic);

export default userRoute;
