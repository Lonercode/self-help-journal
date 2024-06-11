import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('loginToken')
const id = cookies.get('id')
import dateFormat from 'dateformat'




const config = {
  headers: {Authorization: `Bearer ${token}`}
}


const PageEntry = () => {
  const navigate = useNavigate();
  const [entry, setEntry] = useState([]);
  

    
  axios.get(`/api/otu-heart/myEntry?_id=${id}`, config)
  .then((res) => setEntry(res.data.message))
  setTimeout(() => {
    cookies.set('id', entry._id, {
      path: '/update'
    })
}, 2000)


  cookies.set('title', entry.title, {
    path: '/update'
  })


  cookies.set('content', entry.content, {
    path: '/update'
  })

  cookies.set('image', entry.image, {
    path: '/update'
  })





  const dateTime =  dateFormat(entry.date, "mmmm dS, yyyy")
  const imageLink = `http://localhost:3600/${entry.image}`
  return (
    <>
    <div className="entryDetails">
    <img src={imageLink}/>
    <h3>{entry.title}</h3>
    <p id ="dateTime">{dateTime}</p><br/>
    <p>{entry.content}</p>
    <div id = "dashboardButtons">
    <a href= "/update"><button type = "button">Update Entry</button></a>
    <a href= "/dashboard"><button type = "button">To Dashboard</button></a>
   
    </div>
    </div>
    </>
  )

  
}



export default PageEntry