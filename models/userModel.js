import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    regId: {
      type: String,
      required: true,
    },
   
    isAdmin: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    profilepic: {
      type:String,
     
    },
  },
  {
    timestamp: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
