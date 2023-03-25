
import Image from "../models/imageModel.js";
import User from "../models/userModel.js";




export const registerUser = async (req, res) => {
  const { name, email, password, regId, department } = req.body;
  
  const url = req.protocol + '://' + req.get('host')

  const profilepic = url + '/public/' + req.file.filename
  const newUser = new User({ name, email, password, regId, department, profilepic:profilepic });

  try {
    await newUser.save().then(result=>{res.status(201).json({message:"User created successfully",userCreated : {
      name:result.name,email:result.email,password:result.password,regId:result.regId,department:result.department,profilepic:result.profilepic
    }})})
   
  } catch (err) {
  
    res.status(400).json({ message: err });
  }
}
export const loginUser = async (req, res) => {
  const { regId, password } = req.body;
  try {
    const user = await User.find({ regId, password });
    if (user.length > 0) {
      const currentUser = {
        _id: user[0]._id,
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        department: user[0].department,
       profilePic:user[0].profilepic,
        regId: user[0].regId,
      };
      res.send(currentUser);
     
    } else {
      res.status(400).json({ message: "User Login Failed" });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const getUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(user);
   
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
export const getUser = async (req, res) => {

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.send(user);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export const profilePic = async (req, res, err) => {
  const { regId } = req.body;
  const image = req.file.filename;

  const newUserData = { regId, image };
  if (!image) {
    return res.status(400).json({ message: "Image not uploaded" });
  }
  const user = new Image(newUserData);
  await user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Image uploaded successfully",
        image: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
      
    });
};
export const getProfilePic = async (req, res, err) => {
  const { regId } = req.body;
  try {
    const user = await User.find({ regId });
    res.send(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

