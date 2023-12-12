import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import {register} from "./controller/auth.js";
import authRouter from './Router/authRouter.js';
import userRouter from './Router/userRouter.js';
import postRouter from  './Router/postRouter.js'
import { verifyToken } from "./middleware/auth.js";

const  __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

dotenv.config();

const app = express(); 
app.use(express.json());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  

const upload = multer({ storage });
app.post("/auth/register", upload.single("picture"), register);



app.post("/posts",verifyToken,upload.single("picture"),postRouter)
app.use('/auth',authRouter);
 app.use('/users',userRouter);
 app.use('/posts',postRouter); 
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Connected jon port ${PORT}`);
     
    });


  
    
}).catch((err) => {
    console.log(`${err} did not connect`);
});