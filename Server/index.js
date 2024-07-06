import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer';

import path from 'path'

import { fileURLToPath } from 'url';
import { register } from './controllers/auth.js';

import authroutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"

import { createPost } from "./controllers/posts.js"
import { verifyToken } from './middleware/authMd.js';

/* MIDDLEWARE AND PACKAGE CONFIGURATIONS */

// when we use type: module in PACKAGE.json file then we need to do some configuration for filename and dirname like this:

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "/public/assets")))

/* FILE STORAGE CONFIGURATIONS */

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

/* ROUTES WITH FILES */

app.post("/auth/register", upload.single("picture"), register)
app.post("/posts", verifyToken, upload.single("media"), createPost)

/* ROUTES */
app.use("/auth", authroutes)
app.use("/user", userRoutes)
app.use("/posts", postRoutes)

/*  MONGOOSE SETUP */

const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT : ${PORT}`)
    })
}).catch(() => {
    console.log("Some Error in connecting to DB")
})

app.get('/', (req, res) => { res.send(`<h1>Backend Working Fine!</h1>`)})
