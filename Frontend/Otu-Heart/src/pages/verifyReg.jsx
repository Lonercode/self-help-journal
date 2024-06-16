import Cookies from 'universal-cookie';
const cookies = new Cookies();
import Lottie from 'react-lottie-player';
import animationData from '../lotties/meditate.json'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const token = cookies.get('regToken')


const config = {
    headers: {Authorization: `Bearer ${token}`}
  }


function VerifyRegistration(){
    const navigate = useNavigate()
   

      const handleError = (err) => {
        toast.error(err, {
            position: 'top-right'
        })
        setTimeout(() => {
        navigate("/signup");
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
            
            axios.get(`/api/otu-heart/verifyAccount`,
            config)
            .then((res) => handleSuccess(res.data.message))
            .then((console.log(token)))
            .catch(err => {
                console.log(err)
              handleError(err.response.data.message)
            })
          }

    return (
        <>
        <ToastContainer className="toasty"/>

        <p id ="welcometoApp"><b>Welcome to your new self-help journal! You can login using the button below;</b></p>
        <button type ='button' id="confirmRegButton" onClick={handleSubmit}> Take me to my Journal </button>
        
	    <Lottie className='lottie'
      loop
      animationData={animationData}
      play
      style={{ width: 400, height: 400 }}
    />
      
        </>
    )
}

export default VerifyRegistration