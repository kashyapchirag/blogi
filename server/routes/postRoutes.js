import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
import { createPost,getPosts,deletePost,onePost, editPost } from '../controllers/postController.js'

const router = express.Router()

router.post('/create-post',protect,createPost)
router.get('/my-posts',protect,getPosts)
router.get('/post/:id',protect,onePost)
router.put('/edit/post',protect,editPost)
router.delete('/delete/:id',protect,deletePost)

export default router