import { User } from "../models/user.js";
import { Post } from "../models/posts.js";

export const createPost = async (req,res)=>{
    const {content} = req.body;
    if(!content.trim()){
        return res.status(400).json({message:"Post content required"})
    }
    try{
        const post = await Post.create({
            content,
            user:req.user._id
        })
        const user = await User.findById(req.user._id)
        user.posts.push(post._id)
        await user.save()

        return res.status(200).json({message:"post created"})
    }catch{
        return res.status(500).json({message:"error while creating post"})
    }
}

export const getPosts = async(req,res)=>{
    const user = req.user
    try{
        const me = await User.findById(user._id).populate("posts")
        return res.status(201).json({posts:me.posts.reverse()})
    }catch{
        return res.status(500).json({message:"error while getting your posts"})
    }
}

export const onePost = async (req,res)=>{
    const id = req.params.id
    const post = await Post.findById(id)
    try{
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        return res.status(201).json({post,username:req.user.username})
    }catch{
        return res.status(500).json({message:"error while getting your post"})
    }
}

export const editPost = async (req,res)=>{
    const {id,content} = req.body
    const post = Post.findById(id)
    try{
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }

        await Post.updateOne({_id:id},{content})
        return res.status(201).json({message:"Post edited"})
    }catch{
        return res.status(500).json({message:"error while editing your post"})
    }
}

export const deletePost = async (req,res)=>{
    const id = req.params.id;
    const post = Post.findById(id)
    try{
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }

        await Post.deleteOne({_id:id})
        const user = await User.findById(req.user._id)
        user.posts.pull(id)
        await user.save()
        return res.status(201).json({message:"Post deleted"})
    }catch{
        return res.status(500).json({message:"error while deleting your post"})
    }
}