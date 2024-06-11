import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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




function App() {
  

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
      <Route path = '/entryPage' element = {<PageEntry/>}/>
      <Route path = '/update' element = {<UpdateEntry/>}/>
      <Route path = '/verify' element = {<VerifyRegistration/>}/>
      <Route path = '/test' element = {<Test/>}/>
      <Route path = '*' element = {<NotFound/>}/>
    </Routes>
    </BrowserRouter>

    
  
   </>
    )
}

export default App
