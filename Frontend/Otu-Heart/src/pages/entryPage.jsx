import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('loginToken')
import dateFormat from 'dateformat'




const config = {
  headers: {Authorization: `Bearer ${token}`}
}


const PageEntry = () => {
  const ids = useParams()
  const navigate = useNavigate();
  const [entry, setEntry] = useState([]);
  

    
  axios.get(`/api/otu-heart/myEntry?_id=${ids.id}`, config)
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
  const imageLink = entry.image
  return (
    <>
    <div className="entryDetails">
    <img src={imageLink}/>
    <h3>{entry.title}</h3>
    <p id ="dateTime">{dateTime}</p><br/>
    <p>{entry.content}</p>
    <div id = "dashboardButtons">
    <a href= "/update"><button type = "button">Update</button></a>
    <a href= "/dashboard"><button type = "button">Dashboard</button></a>
   
    </div>
    </div>
    </>
  )

  
}



export default PageEntry