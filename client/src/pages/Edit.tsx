import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Edit = () => {

    const {id} = useParams()

    const [username, setUsername] = useState("")
    const [content, setContent] = useState("")
    // const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    
    const getThePost = async (id:any)=>{
        try{
            const res = await axios.get(`/api/post/${id}`,
                {withCredentials:true}
            )
            setContent(res.data.post.content)
            setUsername(res.data.username)
        }catch(err:any){
            toast.error(err.response?.data?.message)
        }
    }

    const handleSubmit = async(e:any)=>{
        e.preventDefault()
        try{
            const res = await axios.put(`/api/edit/post`,
                {id,content},
                {withCredentials:true}
            )
            navigate(`/profile/${username}`)
            toast.success(res.data.message)

        }catch(err :any){
            toast.error(err.response?.data?.message)
        }
    }

    useEffect(() => {
        getThePost(id)
    }, [])

    return (
        <div className="cont w-full min-h-screen bg-zinc-900 flex flex-col  text-white px-12 py-12 relative">
        <div className="logout flex justify-end absolute right-6 top-7">
            <NavLink to={`/profile/${username}`} className="rounded-md bg-yellow-500 h-10 p-2.5 w-16 flex items-center justify-center cursor-pointer">Back</NavLink>
        </div>
        <h1 className="title text-[2rem]">Hello, {username} 👋</h1>
        <h4 className="tip text-[0.9rem] mb-4">You can edit your post</h4>

        <form onSubmit={handleSubmit}>
            <textarea 
            onChange={(e)=>{
                setContent(e.target.value)
            }} 
            value={content} 
            name="content" id="content" className="mb-[0.6rem] resize-none  border-2 border-zinc-800 w-1/3 h-20 p-[0.4rem] rounded-[0.7rem] text-white"></textarea>
            <button type="submit" className="rounded-md bg-blue-500 h-10 p-2.5 w-[8%] flex items-center justify-center cursor-pointer">Save</button>
        </form>

        <div className="posts mt-12 w-full">
            <div className="heading text-[1.3rem] mb-[0.6rem]">Your post</div>
            <div className="postcontainer flex gap-8 justify-start flex-wrap">
                <div  className="post bg-zinc-700 min-w-[31%] max-w-[31%] p-3 border-2 border-zinc-600 rounded-[0.7rem] relative">
                    
                    <div className="username text-blue-500">{ username }</div>
                    <div className="content text-[0.8rem] mb-2">{ content }</div>

                    <form action="/like/<%= element._id%>" className="inline" method="post">
                        <button className="cursor-pointer text-blue-400 text-[0.8rem] mr-[0.2rem]">Like</button>
                    </form>
                </div>
            </div>
        </div>
        
    </div>
    )
}

export default Edit
