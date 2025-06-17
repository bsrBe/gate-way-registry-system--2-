// Importing dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Importing database connection and error middleware
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Importing routes
import userRoutes from './routes/userRoutes.js';
import weaponsRoute from './routes/weaponsRoute.js';
import visitorsRoute from './routes/visitorsRoute.js';
import vehiclesRoute from './routes/vehiclesRoute.js';
import adminRoute from './routes/adminRoute.js';
import voucherRoute from './routes/voucherRoute.js';

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// ✅ CORS setup for cross-origin requests with cookies
const allowedOrigin = 'https://gate-way-registry-system-2.vercel.app';

const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// ✅ Apply CORS BEFORE other middlewares
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight support

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/visitors', visitorsRoute);
app.use('/api/weapons', weaponsRoute);
app.use('/api/vehicles', vehiclesRoute);
app.use('/api/admin', adminRoute);
app.use('/api/voucher', voucherRoute);

// ✅ Root route
app.get('/', (req, res) => {
  res.send(`Hello User, server is running on Port: ${process.env.PORT}`);
});

// ✅ Catch-all route for invalid endpoints
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not a valid path. Please return to a valid endpoint.' });
});

// ✅ Error handling middleware
app.use(notFound);
app.use(errorHandler);

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});


// *********************** Some @desc about the folder structure and overall project arichtecture *********************************
//
// 1) Config Folder :: contains a boilerplate to connect to our database MONGODB (You can put your own connection link in the .env file)😀
//
// 2) Controllers Folder :: contains all the logic behind our endpoints this is where we stuffed all the operations 😎
//
// 3) Middleware Folder :: Here we have diffrent custom middlewares for authentication ,Error handling and etc..💤
//
// 4) Model Folder :: here are all of our Schemas used to store our data 😁
//
// 5) Routes Folder :: Here we actually routed our endpoints by the functions from controllers and we used our middleware here too 💻
//
// 6) Utils Folder :: Here we will SIGN our JWT token and specify all other properties like expiration date and security and others
//
// **NOTES**
// YOU CAN TEST THE ENDPOINTS ETHIER USING THE VS CODE EXTENSION (REST CLIENT) OR POSTMAN OR ANY OTHER TOOL OF YOUR LIKING
// THE SCRIPT FOR DEV TESTING IS (**NPM RUN SERVER)
// ======================================= Check the code for additional Info =====================================


// 🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉 -THE END- 🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉
// 2023,Aug23
