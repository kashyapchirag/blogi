import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e: any)=>{
        e.preventDefault()
        try{
            const res = await axios.post("/api/register",
                {username,email,password}
            )
            toast.success(res.data.message)
            navigate('/login')
        }catch(err:any){
            toast.error(err.response.data.message)
        }
    }

    return (
                <div className='bg-zinc-900 w-screen h-screen flex justify-center items-center text-white'>
            <div className="cont w-1/2 h-[67%] flex flex-col gap-7 justify-start items-center">
                <div className="text flex flex-col justify-center items-center">
                    <h1 className='text-3xl font-bold'>Blogi</h1>
                    <h2 className='text-zinc-400'>Express your feelings ❤️</h2>

                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-5 bg-white text-black px-8 py-6 w-[55%] min-h-[50%] rounded-[1rem]' >
                    <div className="text flex flex-col">
                        <h1 className='text-2xl font-bold'>Welcome</h1>
                        <h2 className='text-[0.9rem] text-zinc-500'>Please enter your details.</h2>
                    </div>


                    <div className="c flex flex-col gap-1">
                        <label htmlFor="username">Username</label>
                        <input onChange={(e)=>{
                            setUsername(e.target.value)
                        }} value={username} className='border-2  px-2 border-zinc-300 rounded-md h-10' required type="text" id='username' />
                    </div>

                    <div className="c flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <input onChange={(e)=>{
                            setEmail(e.target.value)
                        }} value={email} className='border-2  px-2 border-zinc-300 rounded-md h-10' required type="email" id='email' />
                    </div>

                    <div className="c flex flex-col gap-1">
                        <label htmlFor="password">Password</label>
                        <input onChange={(e)=>{
                            setPassword(e.target.value)
                        }} value={password} className='border-2  px-2 border-zinc-300 rounded-md h-10' required type="password" id='password' />
                    </div>

                    <div className="button flex flex-col gap-2">
                        <button type='submit' className='bg-[#3498db] hover:bg-[#208dd5] py-2 cursor-pointer rounded-md text-zinc-100 font-bold'>Register</button>

                        <NavLink className={"text-black text-center text-[0.9rem]"} to={"/login"}>Already Have an account <p className='inline text-blue-500'>Login</p></NavLink>
                    </div>

                    
                    
                </form>
            </div>
        </div>
    )
}

export default Register
