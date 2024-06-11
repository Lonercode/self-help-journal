import { useState } from "react"
import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies()



function Login(){


    const navigate = useNavigate()
    const [user, setUser] = useState("");
    const {email, password} = user;

    
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff)

    //eye for password
    const handleEye = () => {
        if (type === 'password'){
            setIcon(eye);
            setType('text')
        }
        else{
            setIcon(eyeOff)
            setType('password')
        }
    }

     //on change

     const handleOnChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name] : value
        })
    }

    //on error 

    const handleError = (err) => {
        toast.error(err, {
            position: 'top-right'
        })
        setTimeout(() => {
        navigate("/login");
    }, 2000)
    }

    //on success

    const handleSuccess = async (msg, tok, nme) => {
        toast.success(msg, {
            position: 'top-right'
        })
        cookies.set('loginToken', tok, {
            path: "/"
        })
        cookies.set('name', nme, {
            path: "/"
        })
        axios.defaults.headers.common['Authorization'] = `Bearer ${tok}`
        setTimeout(() => {
            navigate("/dashboard");
             window.location.reload()
          }, 2000)
       
        
    }

    //on submit

    function handleSubmit(e){
        e.preventDefault()
        axios.post('/api/otu-heart/login', {
            ...user,
            
        },
        {withCredentials: true}
        )
        .then((res) => handleSuccess(res.data.message, res.data.token, res.data.name))
        
        .then(() => setUser({email: "", password: ""}))
        .catch(err => {
            console.log(err)
          handleError(err.response.data.message)
        })
      }


    return (
        <>
       
        <div className="loginForm">
            <h3>Welcome Back &#128522;</h3>
            <ToastContainer className="toasty"/>
        <form method="post" onSubmit={handleSubmit}>
            <label id= "email"><b>Email</b></label>
            <input id="email" type="email" value={email} onChange={handleOnChange} name = "email"></input>
            <label id = "password"><b>Password</b><span class = "flex justify-around items-center" onClick={handleEye}>
                <Icon class="absolute mr-10" icon={icon} size={25}/>
            </span></label> 
            <input type={type} id="pass" name="password" value={password}
            onChange={handleOnChange}></input>
            <button type="submit" id="Loginbut1">Login</button>
            <a href="/"><button type="button" id="Loginbut2">Home</button></a>
        </form>

        <p><a href = "/forgotPassword">Forgot password?</a></p>
        <p><a href = "/signup">Yet to register?</a></p><br/>
        </div>

        <img src = "\images\music.png" id = "Loginmusicguy"/>
        <img src = "\images\meditate.png" id = "Loginmeditate"/>
     
        </>
        
    )
}

export default Login