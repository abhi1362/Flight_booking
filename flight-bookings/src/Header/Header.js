import React from 'react'
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

const Header = ({isLogin, setIsLogin}) => {
  let navigate = useNavigate();
  const logout = () =>{
    localStorage.removeItem('login');
    setIsLogin(false);
    navigate('/');
  }
  return (
    <header className='page-heading'>
        <div className='flight-icon-heading'>
            <FontAwesomeIcon icon={faPlaneUp} className='plane-icon'/>
            <h2 className='flight-booking-text'>Flight Booking</h2>
        </div>
        <div>
            {isLogin && <FontAwesomeIcon icon={faSignOutAlt} className='signout-icon' onClick={logout}/>}
        </div>
    </header>
  )
}

export default Header