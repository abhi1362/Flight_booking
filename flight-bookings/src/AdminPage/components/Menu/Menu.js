import React from 'react'
import './Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCirclePlus, faList } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams  } from "react-router-dom";

const Menu = () => {
  const param = useParams();
  return (
    <div className='menu-list'>
        <p className='menu-heading'>Menu</p>
        <div className={`home item ${param['*'] === "" ? 'selected-list' : ""}`}><Link to=""><span><FontAwesomeIcon icon={faHouse} className='icon-item'/></span>Home</Link></div>
        <div className={`add-airport item ${param['*'] === 'addAirport' ? 'selected-list' : ""}`}><Link to='addAirport'><span><FontAwesomeIcon icon={faCirclePlus} className='icon-item'/></span>Add Airport</Link></div>
        <div className={`view-airport item ${param['*'] === 'airportDetails' ? 'selected-list' : ""}`}><Link to="airportDetails"><span><FontAwesomeIcon icon={faList} className='icon-item'/></span>View Airport</Link></div>
        <div className={`add-flight item ${param['*'] === 'addFlight' ? 'selected-list' : ""}`}><Link to="addFlight"><span><FontAwesomeIcon icon={faCirclePlus} className='icon-item'/></span>Add Flight</Link></div>
        <div className={`view-flight item ${param['*'] === 'flightDetails' ? 'selected-list' : ""}`}><Link to="flightDetails"><span><FontAwesomeIcon icon={faList} className='icon-item'/></span>View Flight</Link></div>
        {/* <div className='search-flight item'><span><FontAwesomeIcon icon={faMagnifyingGlass} className='icon-item'/></span>Search Flight</div> */}
    </div>
  )
}

export default Menu