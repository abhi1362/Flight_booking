import React, { useState } from 'react'
import './AddAirport.css';
import Modal from'../Modals/Modal';
import { useLocation } from "react-router-dom";

const AddAirport = () => {
  const location = useLocation();
  const [airportCode, setAirportCode] = useState(location.state === null ? '' : location.state.data.airportCode);
  const [airportState, setAirportState] = useState(location.state === null ? '' : location.state.data.airportState);
  const [airportName, setAirportName] = useState(location.state === null ? '' : location.state.data.airportName);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const addAirportDetails = () =>{
    if(airportCode === '' || airportState === '' || airportName === ''){
      setErrorMessage('Please Fill all the fields')
    }
    else{
      let url = location.state === null ? 'http://localhost:3001/airportDetails' : `http://localhost:3001/airportDetails/${location.state.data.id}`
      fetch(url,
      {
        method: location.state === null ? "POST" : "PUT",
        body: JSON.stringify({
          airportCode,
          airportState,
          airportName
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(res => {
          res.json();
          setModalOpen(true);
          setAirportCode('');
          setAirportState('');
          setAirportName('');
          setErrorMessage('');
      })
      .catch(err => {
        console.log(err)
        setErrorMessage('Error in adding airport Details')
      });
    }
  }
  return (
    <>
    <div className='add-airport-list'>
        <p className='add-airport-heading'>Add Airport</p>
        <p className='error-text'>{errorMessage}</p>
        <div className="txt_field">
            <input type="text" value={airportCode} onChange={(e)=>setAirportCode(e.target.value)} required />
            <span></span>
            <label>Airport Code</label>
        </div>
        <div className="txt_field">
            <input type="text" value={airportState} onChange={(e)=>setAirportState(e.target.value)} required />
            <span></span>
            <label>Airport State</label>
        </div>
        <div className="txt_field">
            <input type="text" value={airportName} onChange={(e)=>setAirportName(e.target.value)} required />
            <span></span>
            <label>Airport Name</label>
        </div>
        <button className='login-btn' onClick={addAirportDetails}>Add</button>
    </div>
    {modalOpen && <Modal setOpenModal={setModalOpen} textFrom="Airport"/>}
    </>
  )
}

export default AddAirport