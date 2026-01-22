//importing importand modules
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


import { user } from './models/userSchema.js';
import { post } from './models/postSchema.js';
import { runInNewContext } from 'vm';

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('public'))



try {
    let a = await mongoose.connect("mongodb://localhost:27017/user");
    console.log('mongoose connected with express...');

} catch (err) {
    console.log('error occured while connecting mongoose with express...');

}





app
    .get('/', (req, res) => {
        res.render('index')
    })

    .get('/login', (req, res)=>{
        res.render('login')
    })

    .get('/dashboard', (req, res)=>{
        res.render('dashboard')
    })

    .post('/register' ,async (req, res)=>{

        try{
            const {name,username,email,password,age}=req.body
            if(!name || !username || !email || !password || !age){
                return res.status(400).send('All fields are required')
            }
            let found = await user.findOne({email})
            if(found){
                return res.status(409).send('User already exists')
            }

            const hashedPassword = await bcrypt.hash(password,10);
            
            await user.create({name,username,email,password:hashedPassword,age})
            res.send('user created')

        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    })

    .post('/login' ,async (req, res)=>{

        try{
            const {email,password}=req.body
            const account = await user.findOne({email})
            if(!account){
                return res.redirect('/register')
            }
            const isMatch = await bcrypt.compare(password,account.password)
            if(isMatch){
                const token = jwt.sign({email},'secrethahaha')
                res.cookie('token',token)
                return res.redirect('/dashboard')
            }else{
                return res.send('wrong credentials')
            }


        }catch(err){
            console.error(err.message)
            res.status(500).send('Login Error')
        }

    })

    .post('/logout' ,async (req, res)=>{

        try{
            res.clearCookie('token')
            res.redirect('/login')

        }catch(err){
            console.error(err.message)
            res.status(500).send('Login Error')
        }

    })

app.listen(3000)
