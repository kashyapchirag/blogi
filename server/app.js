import express from 'express'
import dotenv from 'dotenv'
import { DBconnection } from './config/db.js';
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'

dotenv.config();
const app = express();
DBconnection();

//global middlewares setup
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());

app.use('/api',authRoutes)

export default app;