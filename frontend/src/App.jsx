import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import {Button} from '@mui/material'
import Login from './pages/Login'
import Home from './pages/Home'
import { AuthContext } from 'react-oauth2-code-pkce'
import { useDispatch } from 'react-redux'
import { setCredentials } from './store/authSlice'

const App = () => {

  const {token , tokenData , logIn , logOut , isAuthenticated} = useContext(AuthContext);

  const dispatch = useDispatch();
  const [authReady , setAuthReady] = useState(false);

  useEffect(()=>{

    if(token){
      dispatch(setCredentials({token ,user: tokenData}))
      setAuthReady(true);
    }

  },[token , tokenData ,dispatch])


  return (
    <>
    <BrowserRouter>
    <Button variant='contained' color='#dc004e' onClick={()=>{
      logIn()
    }}>Login</Button>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
    </Routes>

    </BrowserRouter>
    
    </>
  )
}

export default App