import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes.js";
import {imageRoute} from './routes/imageRoutes.js'
import path from "path";




const app = express();


const port = process.env.PORT || 5000;
const connecturl =
  "mongodb+srv://hameed381:Y16cs943@cluster0.l6plzgu.mongodb.net/christTheKing?retryWrites=true&w=majority";
mongoose
  .connect(connecturl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
 
  
  
  app.use(express.static(path.join(__dirname,'../client/build')))
  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"../client/build/index.html"))
  }) 
app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin:"*"
}));




app.use('/public',express.static('public'))
app.use('/api',imageRoute)
app.use("/api/users/", express.static('public'), userRoute);


// Error
app.use((req, res, next) => {
  // Error goes via `next()` method
  setImmediate(() => {
    next(new Error('Something went wrong'));
  });
});
app.use(function (err, req, res, next) {
 
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});