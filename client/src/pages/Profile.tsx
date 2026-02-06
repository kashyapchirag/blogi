import axios from 'axios'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Profile = () => {

    const [username, setUsername] = useState("")
    const [content, setContent] = useState("")
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    const getInfo = async ()=>{
        try{
            const res = await axios.get('/api/profile',{withCredentials:true})
            setUsername(res.data.username)

        }catch(err:any){
            toast.error(err.response?.data?.message)
        }
        
    }

    const getMyPosts = async ()=>{
        try{
            const res = await axios.get('/api/my-posts',{withCredentials:true})
            setPosts(res.data.posts)
            console.log(posts)

        }catch(err :any){
            toast.error(err.response?.data?.message)
        }
    }

    const handleLogout = async ()=>{
        await axios.post("/api/logout",{},{withCredentials:true})
        navigate('/login')
    }

    useEffect(() => {
        getInfo()
        getMyPosts()
    }, [])

    const handleSubmit = async (e :any)=>{
        e.preventDefault()
        try{
            const res = await axios.post("/api/create-post",
                {content},
                {withCredentials:true}
            )
            setContent("")
            toast.success(res.data.message)
            getMyPosts()
        }catch(err: any){
            toast.error(err.response?.data?.message)
        }
    }
    const handleDelete = async (id :String)=>{
        try{
            const res = await axios.delete(`/api/delete/${id}`,
                {withCredentials:true}
            )
            getMyPosts()
            toast.success(res.data.message)
        }catch(err: any){
            toast.error(err.response?.data?.message)
        }
    }


    


    return (
        <div className="cont w-full min-h-screen bg-zinc-900 flex flex-col  text-white px-12 py-12 relative">
        <div className="logout flex justify-end absolute right-6 top-7">
            <button onClick={handleLogout} className="rounded-md bg-red-500 h-10 p-2.5 w-16 flex items-center justify-center cursor-pointer">logout</button>
        </div>
        <h1 className="title text-[2rem]">Hello, {username} 👋</h1>
        <h4 className="tip text-[0.9rem] mb-4">You can create new posts</h4>

        <form onSubmit={handleSubmit}>
            <textarea 
            onChange={(e)=>{
                setContent(e.target.value)
            }} 
            value={content} 
            name="content" id="content" className="mb-[0.6rem] resize-none bg-transparent border-2 border-zinc-800 w-1/3 h-20 p-[0.4rem] rounded-[0.7rem]" placeholder="What's in your mind"></textarea>
            <button type="submit" className="rounded-md bg-blue-500 h-10 p-2.5 w-[8%] flex items-center justify-center cursor-pointer">Create</button>
        </form>

        <div className="posts mt-12 w-full">
            <div className="heading text-[1.3rem] mb-[0.6rem]">Your posts</div>
            <div className="postcontainer flex gap-8 justify-center flex-wrap">

                {/* <% posts.forEach(element => {%> */}
                {posts.map((post)=>{
                    return(
                    <div key={post._id} className="post bg-zinc-700 min-w-[31%] max-w-[31%] p-3 border-2 border-zinc-600 rounded-[0.7rem] relative">
    
                        <div className="username text-blue-500">{ username }</div>
                        <div className="content text-[0.8rem] mb-2">{ post.content }</div>

                        <form action="/like/<%= element._id%>" className="inline" method="post">
                            <button className="cursor-pointer text-blue-400 text-[0.8rem] mr-[0.2rem]">Like</button>
                        </form>

                        <NavLink to={`/profile/edit/${post._id}`} className="text-zinc-400 text-[0.8rem] mr-[0.2rem]">Edit</NavLink>

                            <button onClick={()=>handleDelete(post._id)} className="flex justify-end absolute right-4 bottom-3.5 text-red-500 text-[0.8rem] cursor-pointer">Delete</button>
                    </div>
                    )
                })

                }
            </div>
        </div>
        
    </div>
    )
}

export default Profile
