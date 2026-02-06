import express from 'express'
import { getProfile } from '../controllers/profileController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get("/profile",protect,getProfile);

export default router