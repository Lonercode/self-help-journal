import { useEffect, useState } from 'react'
import Home from './pages/home'
import './App.css'
import {BrowserRouter, Routes, Route, useNavigate, Outlet} from 'react-router-dom';
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
import NotFound from './pages/notFound'
import {jwtDecode} from 'jwt-decode'
import Cookies from 'universal-cookie';
import Affirm2 from './pages/affirm2';
const cookies = new Cookies();
const token = cookies.get('loginToken')
const name = cookies.get('name')
import AuthWrapper from './pages/authWrapper';



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
      <Route path = '/login' element = {<Login/>}/>
      <Route path = '/signup' element = {<Register/>}/>
      <Route path = '/about' element = {<About/>}/>
      <Route path = '/affirmations' element = {<Affirm/>}/>
      <Route path = '/confirm' element = {<Confirm/>}/>
      <Route path = '/forgotPassword' element = {<ForgotPassword/>}/>
      <Route path = '/passwordNotification' element = {<Notification/>}/>
      <Route path = '/resetPassword' element = {<ResetPassword/>}/>
      <Route path='/' element = {<Home/>}/>
      <Route path = '/verify' element = {<VerifyRegistration/>}/>
      <Route element = {<AuthWrapper/>}>
      <Route path = '/create' element = {<CreateEntry/>}/>
      <Route path = '/dashboard' element = {<Dashboard/>}/>
      <Route path = '/entryPage/:id' element = {<PageEntry/>}/>
      <Route path = '/update' element = {<UpdateEntry/>}/>
      <Route path = '/affirmations2' element = {<Affirm2/>}/>
      </Route>
     
      <Route path = '*' element = {<NotFound/>}/>
    </Routes>
    </BrowserRouter>

   </>
    )
  }



export default App
