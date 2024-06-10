import { useState } from "react"
import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify'
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


function Register(){

    const [password1, setPassword1] = useState("");
    const [type, setType] = useState("password");
    const [type1, setType1] = useState("password");
    const [icon, setIcon] = useState(eyeOff)
    const [icon1, setIcon1] = useState(eyeOff)

    const navigate = useNavigate()
    const [user, setUser] = useState("");
    const {name, email, password} = user;


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

    const handleEye1 = () => {
        if (type1 === 'password'){
            setIcon1(eye);
            setType1('text')
        }
        else{
            setIcon1(eyeOff)
            setType1('password')
        }
    }

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
        navigate("/signup");
    }, 5000)
    }

    //on success

    const handleSuccess = async (msg, tok) => {
        toast.success(msg, {
            position: 'top-right'
        })
       
        cookies.set('regToken', tok, {path: '/verify'})
        setTimeout(() => {
             window.location.reload()
          }, 2000)
       
    }

     //on submit

     const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3600/otu-heart/register', {
            ...user,
            confirmPassword: password1
            
        },
        {withCredentials: true}
        )
       
        .then((res) => handleSuccess(res.data.message,res.data.token))

        .then(() => setUser({name: "", email: "", password: ""}))
        .then(() => setPassword1({password1: ""}))
        .catch(err => {
            console.log(err)
          handleError(err.response.data.message)
        })
      }
      
      

    return (
        <>
        <div className="registerForm">
            <h3>Sign Up with Us &#127881;</h3>
            <ToastContainer className='toasty'/>
        <form method="post" onSubmit={handleSubmit}>
            <label id= "nme"><b>Name</b></label>
            <input id="nme" type="text" value={name} onChange={handleOnChange} name = "name"></input>
            <label id= "email"><b>Email</b></label>
            <input id="email" type="email" value={email} onChange={handleOnChange} name = "email"></input>
            <label id = "password"><b>Password</b></label>
            <input type={type} id="pass1"name="password" value={password}
            onChange={handleOnChange}></input>
            <span class = "flex justify-around items-center" onClick={handleEye}>
                <Icon class="absolute mr-10" icon={icon} size={25}/>
            </span>
            <label id = "password"><b>Confirm Password</b></label>
            <input type={type1} id="pass2" name="confirmPassword" value={password1}
            onChange={(e) => setPassword1(e.target.value)}></input>
            <span class = "flex justify-around items-center" onClick={handleEye1}>
                <Icon class="absolute mr-10" icon={icon1} size={25}/>
            </span>
            <button type="submit" id="Loginbut1">Sign Up</button>
            <a href="/"><button type="button" id="Loginbut2">Home</button></a>
        </form>
        <p><a href = "/login">Already have an account?</a></p>
        </div>
        <img src = "\images\earth.png" id = "Loginearth"/>
        <img src = "\images\write.png" id = "Loginwrite"/>
        <img src = "\images\work.png" id = "Loginwork"/>
        <img src = "\images\mountain.png" id = "Loginmount"/>
        </>
    )
}

export default Register