import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('token')

const config = {
    headers: {Authorization: `Bearer ${token}`}
  }

function ResetPassword(){

    const navigate = useNavigate()
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff)

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



    const handleOnChange = (e) => {
        setPassword(e.target.value)
    }

    const handleError = (err) => {
        toast.error(err, {
            position: 'top-right'
        })
        setTimeout(() => {
        navigate("/login");
    }, 2000)
    }


    const handleSuccess = async (msg) => {
        toast.success(msg, {
            position: 'top-right'
        })
        setTimeout(() => {
            navigate("/login");
             window.location.reload()
          }, 2000)
    }

    const handleSubmit = event => {
        event.preventDefault()

        axios.post('http://localhost:3600/otu-heart/resetPassword',{password:password}, config
            )
            .then((res) => handleSuccess(res.data.message))
            .then(() => setPassword(""))
            .catch(err => {
                console.log(err)
              handleError(err.response.data.message)
            })
          }



    return (
        <>
         <div className="loginForm">
            <h3>Type in Your new password &#128522;</h3>
            <ToastContainer className='toasty'/>
        <form method="post" onSubmit={handleSubmit}>
            <label id= "resetPassword"><b>Password</b></label>
            <input type={type} id="resetPassword" name="password" value={password}
            onChange={handleOnChange}></input>
            <span class = "flex justify-around items-center" onClick={handleEye}>
                <Icon class="absolute mr-10" icon={icon} size={25}/>
            </span>
           
            <button type="submit" id="Loginbut1">Reset Password</button>
        
        </form>
        </div>
        </>
    )
}

export default ResetPassword