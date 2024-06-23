import { useEffect, useState } from 'react'
import Home from './pages/home'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/signUp'
import About from './pages/about'
import Dashboard from './pages/dashboard'
import Affirm from './pages/affirm'
import Confirm from './pages/confirmAccount'
import ForgotPassword from './pages/forgotPassword'
import Notification from './pages/notifyForPassword'
import ResetPassword from './pages/resetPassword'
import CreateEntry from './pages/createEntry'
import PageEntry from './pages/entryPage'
import UpdateEntry from './pages/updateEntry'
import VerifyRegistration from './pages/verifyReg'
import Test from './pages/test'
import NotFound from './pages/notFound'
import {jwtDecode} from 'jwt-decode'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('loginToken')
const name = cookies.get('name')



function Nav() {


  return (
  <>
  <nav className = "theNav">
    <a href = "#" title="Go to the homepage">Otu (Heart) Self-Help Journal</a><br/>
    <a href = "#" className='footer'>&copy; 2024 Otu(Heart)</a>
  
  </nav>
  </>
  )
}

const tokenExpired = (token, name) => {
  
  try{
  
    const decoded = jwtDecode(token)
    const currTime = Date.now() / 1000;
    if (decoded.exp < currTime){
      window.location.href = '/login'
      cookies.remove(token)
      cookies.remove(name)
    }
  } catch(err){
    console.error(err)
    window.location.href = '/login'
  }
}


function App() {
  

  useEffect(() => {
    tokenExpired(token, name)
  }, [])
  return (
    <>
    <Nav/>
 
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path = '/login' element = {<Login/>}/>
      <Route path = '/signup' element = {<Register/>}/>
      <Route path = '/about' element = {<About/>}/>
      <Route path = '/dashboard' element = {<Dashboard/>}/>
      <Route path = '/affirmations' element = {<Affirm/>}/>
      <Route path = '/confirm' element = {<Confirm/>}/>
      <Route path = '/forgotPassword' element = {<ForgotPassword/>}/>
      <Route path = '/passwordNotification' element = {<Notification/>}/>
      <Route path = '/resetPassword' element = {<ResetPassword/>}/>
      <Route path = '/create' element = {<CreateEntry/>}/>
      <Route path = '/entryPage/:id' element = {<PageEntry/>}/>
      <Route path = '/update' element = {<UpdateEntry/>}/>
      <Route path = '/verify' element = {<VerifyRegistration/>}/>
      <Route path = '/test' element = {<Test/>}/>
      <Route path = '*' element = {<NotFound/>}/>
    </Routes>
    </BrowserRouter>

   </>
    )}



export default App
