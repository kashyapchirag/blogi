import express from 'express'
import dotenv from 'dotenv'
import { DBconnection } from './config/db.js';
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import postRoutes from './routes/postRoutes.js'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
DBconnection();

//global middlewares setup
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser())

app.use('/api',authRoutes)
app.use('/api',profileRoutes)
app.use('/api',postRoutes)

export default app;