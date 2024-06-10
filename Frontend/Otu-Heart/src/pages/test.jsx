import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
const cookies = new Cookies();
const token = cookies.get('regToken')



function Test(){




    return (
        <>
        <p>{token}</p>
         </>
    )
}

export default Test