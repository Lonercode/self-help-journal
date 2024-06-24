import { Outlet, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('loginToken')
const name = cookies.get('name')

const tokenExpired = (token, name) => {

    try{
    
      const decoded = jwtDecode(token)
      const currTime = Date.now() / 1000;
      if (decoded.exp < currTime){
        return true
  
      }

  
    } catch(err){
      console.error(err)
      return true
    }
  
  }
  
  const AuthWrapper = ()  => {

    const navigate = useNavigate()

    if (tokenExpired(token, name)){
      cookies.remove(token)
      cookies.remove(name)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
  
    }
    else{
      return <Outlet/>
    }
  
  }

  export default AuthWrapper