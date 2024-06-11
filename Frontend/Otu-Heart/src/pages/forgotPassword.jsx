import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
const cookies = new Cookies();



function ForgotPassword(){

   
    const navigate = useNavigate()
    const [email, setEmail] = useState("")


    const handleOnChange = (e) => {
        setEmail(e.target.value)
    }

    const handleError = (err) => {
        toast.error(err, {
            position: 'top-right'
        })
        setTimeout(() => {
        navigate("/login");
    }, 2000)
    }


    const handleSuccess = async (msg, tok) => {
        toast.success(msg, {
            position: 'top-right'
        })
        cookies.set('email', email,{
            path: '/passwordNotification'
        })
        cookies.set('token', tok, {
            path: "/resetPassword"
        })
        setTimeout(() => {
            navigate("/passwordNotification");
             window.location.reload()
          }, 2000)
    }

    const handleSubmit = event => {
        event.preventDefault()

        axios.post('/api/otu-heart/forgotPassword',{email:email}
            )
            .then((res) => handleSuccess(res.data.message, res.data.token))
            .then(() => setEmail(""))
            .catch(err => {
                console.log(err)
              handleError(err.response.data.message)
            })
          }

    
    return (
        <>
         <div className="loginForm">
            <h3>Type in Yor Email &#128522;</h3>
            <ToastContainer className="toasty"/>
        <form method="post" onSubmit={handleSubmit}>
            <label id= "emailforReset"><b>Email</b></label>
            <input id="emailforReset" type="email" onChange={handleOnChange} value={email}></input>
           
            <button type="submit" id="Loginbut1">Reset Password</button>
            <a href="/"><button type="button" id="Loginbut2">Home</button></a>
        </form>
        </div>
        </>
    )
}

export default ForgotPassword