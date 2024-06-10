import Lottie from 'react-lottie-player';
import animationData from '../lotties/notHere.json'

function NotFound(){
    return(
        <>
        <div className="notHere">
        <p><b>This page may not exist or your network connection may be down</b></p><br/>
        <a href = "/"><button type ='button'> Go Home </button></a>
        
        <Lottie className='lottie'
      loop
      animationData={animationData}
      play
      style={{ width: 400, height: 400 }}
    />
      
        </div>
        </>
    )
}

export default NotFound