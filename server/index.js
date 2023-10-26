// imorting Express for out http endpoints
import express from 'express'
// importing cors for more security and access control 
import cors from 'cors'
// importing dotenv for bringing in the enviroment variables in our .env file
import dotenv from 'dotenv'
// importing cookie-pareser for parsing our http-only-cookie which is signed by JWT to store in the clients Local Storage
import cookieParser from 'cookie-parser'
// importing Databse connection function/method
import connectDB from './config/db.js'
// importing error handler middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// importing API endpoints here
import userRoutes from './routes/userRoutes.js'
import weaponsRoute from './routes/weaponsRoute.js'
import visitorsRoute from './routes/visitorsRoute.js'
import vehiclesRoute from './routes/vehiclesRoute.js'
import adminRoute from './routes/adminRoute.js'
import voucherRoute from './routes/voucherRoute.js'
// Bringing in enviroment variables via dotenv and initalizing Database connection, and
// Initalizing express By Invoking the express() method on the and assigning it to app variable
dotenv.config()
connectDB()
const app = express();

// Middlewares used
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:4173',
    'http://localhost:4174',
    'https://gate-registry-system.vercel.app',
    'gate-way-registry-system-2-mlbo-8l354dlw3-bsrbe.vercel.app',
    'gate-way-registry-system-2-hx8bbu5zw-bsrbe.vercel.app',
]
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by Cors'))
        }
    },
    credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// API Routes
app.use('/api/users', userRoutes)
app.use('/api/visitors', visitorsRoute)
app.use('/api/weapons', weaponsRoute)
app.use('/api/vehicles', vehiclesRoute)
app.use('/api/admin', adminRoute)
app.use('/api/voucher', voucherRoute)
// API Route for non-valid EndPoints
app.use('*', (req, res) => { res.json({"message":"not vaild path please return to a vaild endpoint"}) })


// Sending Testing for browser
app.get("/", (req, res) => { res.send(`Hello User of Port:${process.env.PORT}`) });

// error handler Middlewares
app.use(notFound)
app.use(errorHandler)

// app's Running Enviroment
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port http://loclahost:${process.env.PORT}`);
});



// *********************** Some @desc about the folder structure and overall project arichtecture *********************************
//
// 1) =>config Folder :: contains a boilerplate to connect to our database MONGODB (You can put your own connection link in the .env file)😀
//
// 2) =>controllers Folder :: contains all the logic behind our endpoints this is where we stuffed all the operations😎
//
// 3) =>middleware Folder :: Here we have diffrent custom middlewares for authentication ,Error handling and etc..💤
//
// 4) =>model Folder :: here are all of our Schemas used to store our data 😁
//
// 5) =>routes Folder :: Here we actually routed our endpoints by the functions from controllers and we used our middleware here too💻
//
// 6) =>utils Folder :: Here we will SIGN our JWT token and specify all other properties like expiration date and security and others
//
// **NOTES
// YOU CAN TEST THE ENDPOINTS ETHIER USING THE VS CODE EXTENSION (REST CLIENT) OR POSTMAN OR ANY OTHER TOOL OF YOUR LIKING
// THE SCRIPT FOR DEV TESTING IS (NPM RUN SERVER)
// ======================================= Check the code for additional Info =====================================


// 🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉 -THE END- 🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
// 2023,Aug23
