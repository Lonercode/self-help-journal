import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate} from "react-router-dom"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('loginToken')
const name = cookies.get('name')
import {ToastContainer, toast} from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const config = {
  headers: { 'Content-Type': 'multipart/form-data', 'Authorization':`Bearer ${token}` },
  
}


function CreateEntry(){

    const navigate = useNavigate()
    const [created, setCreated] = useState("");
    const {title, content} = created;
    const [image, setImage] = useState();

    


    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setCreated({
            ...created,
            [name] : value
        })
    }

    const handleContentChange = (value) => {
        setCreated({
          ...created,
          content: value,
        });
      };
    

    const handleError = (err) => {
        toast.error(err, {
            position: 'top-right'
        })
        setTimeout(() => {
        navigate("/dashboard");
    }, 2000)
    }

    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0])
      }
    

    const handleSuccess = async (msg) => {
        toast.success(msg, {
            position: 'top-right'
        })
        setTimeout(() => {
            navigate("/dashboard");
             
          }, 2000)
        }

        function handleSubmit(e){
            e.preventDefault()
            const formData = new FormData();
            formData.append('image', image)
            formData.append('title', title)
            formData.append('content', content)
            const filez = document.getElementById('image')

            if(filez.files.length == 0){
                toast.error("You must add an image file", {
                    position: 'top-right'
                })
            }
            else{

            axios.post('/api/otu-heart/createEntry',formData,
            config,
            {withCredentials: true}
            )
            .then((res) => handleSuccess(res.data.message))
            
            
            .then(() => setCreated({data: "", image: "", title: "", content: ""}))
            .catch(err => {
                console.log(err)
              handleError(err)
            })
          }
        }
    

    return (
        <>
        <div className="loginForm">
        <h3>New Entry</h3>
        <ToastContainer className="toasty"/>
        <form method="post" onSubmit={handleSubmit}>
            <label for= "file"><b>Image</b></label><br/>
            <input id="image" type="file" accept="image/*" style={{cursor:'pointer'}} onChange={handleFileChange} name = 'image' ></input><br/><br/>

            <label id= "title"><b>Title</b></label>
            <input id="title" type="text" value={title} onChange={handleOnChange} name = 'title'></input><br/>

            <label id= "content"><b><i>Your reflection</i></b></label>
            <ReactQuill id="txtarea" type="text" value={content} onChange={handleContentChange} name = 'content'/>
           
            <button type="submit" id="Loginbut1">Save</button>
            <a href="#"><button type="button" id="Loginbut2">Delete</button></a>
    
            <a href="/dashboard"><button type="button" id="dashboardbt">My Dashboard</button></a>
        </form>
        <img src = 'images/leisure.png' id = "leisure"/>
        <img src = 'images/tablet.png' id = "tablet"/>
        </div>
        </>
    )
}

export default CreateEntry