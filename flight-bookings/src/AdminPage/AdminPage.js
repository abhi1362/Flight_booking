import React, { useEffect } from 'react'
import './AdminPage.css';
import Menu from './components/Menu/Menu'
import Home from './components/Home/Home'
import ViewAirport from './components/ViewAirport/ViewAirport'
import ViewFlight from './components/ViewFlight/ViewFlight';
import AddAirport from './components/AddAirport/AddAirport';
import AddFlight from './components/AddFlight/AddFlight';
import { Route, Routes, useNavigate } from "react-router-dom";

const AdminPage = ({isLogin, setIsLogin}) => {
  let navigate = useNavigate();
  useEffect(() => {
    const login = localStorage.getItem('login');
    if(login){
      let auth = JSON.parse(localStorage.getItem('login'));
      setIsLogin(auth.userLogin)
    }
    else{
      setIsLogin(false)
    }
    if(!isLogin){
      navigate('/')
    }
  }, [navigate,isLogin,setIsLogin])
  
  return (
    <div className='row'>
        <div className='col-left'>
            <Menu />
        </div>
        <div className='col-right'>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="addAirport" element={<AddAirport />} />
            <Route path="airportDetails" element={<ViewAirport />} />
            <Route path="addFlight" element={<AddFlight />} />
            <Route path="flightDetails" element={<ViewFlight />} />
          </Routes>
        </div>
    </div>
  )
}

export default AdminPage