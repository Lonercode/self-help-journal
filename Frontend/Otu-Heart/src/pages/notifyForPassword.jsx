import Cookies from 'universal-cookie';
const cookies = new Cookies();
const email = cookies.get('email')
import Lottie from 'react-lottie';
import animationData from '../lotties/mail.json'


function Notification(){

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    return (
        <>
        <p><b>Check your email for your link at {email}</b></p>
        <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      />
        </>
    )
}

export default Notification