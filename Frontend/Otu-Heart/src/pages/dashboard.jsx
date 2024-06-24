import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, Link} from "react-router-dom"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('loginToken')
const name = cookies.get('name')
import dateFormat from 'dateformat'



const config = {
  headers: {Authorization: `Bearer ${token}`}
}


const UserEntries = () => {
  const [entries, setEntries] = useState([]);

  
    axios.get('/api/otu-heart/myEntries', config)
    .then((res) =>setEntries(res.data.message))
    
  
  
  let val = entries.map((item) => {
    const dateTime =  dateFormat(`${item.date}`, "mmmm dS, yyyy")
    const imageLink = item.image
    
    return (<>
    <div className = "entry">
    <img src={imageLink}/>
    <h3>{item.title}</h3>
    <p id ="dateTime">{dateTime}</p><br/>
    <p>{item.content.substring(0, 100)}...</p>
    <Link to={`/entryPage/${item._id}`}>Read my thoughts</Link>
    </div>
    </>)
  })

  

  if (val.length != 0){
    return (
        <>
        <div className='stuff'>
                {val}
        </div>
        </>
    )
  }

  else{
   
    return (
      <>
      <div className='none'>
              <p>You have no entries listed. Please create a new entry.</p>
      </div>
      </>
  )
}
}



  

function Dashboard(){
  
  
    return (
        <>
        <p id = "name"><b>&#128516; Hello {name},</b></p>
        <UserEntries/>
        <div id = "dashboardButtons">
       <a href= "/create"><button type = "button" id = "dashbutton">Create</button></a>
        <a href = "/affirmations2"><button type = "button"  id = "dashbutton">Affirmations</button></a>
        </div>
        </>
    )
}

export default Dashboard