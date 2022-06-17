import React, { useState } from 'react';
import './AddFlight.css';
import { useLocation } from "react-router-dom";
import Modal from'../Modals/Modal';

const AddFlight = () => {
    const location = useLocation();
    const [modalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [flightAppData, setFlightAppData] = useState({
        flightNumber: location.state === null ? '' : location.state.data.flightNumber,
        airlineName: location.state === null ? '' : location.state.data.airline,
        from: location.state === null ? '' : location.state.data.from,
        to: location.state === null ? '' : location.state.data.to,
        deptDate: location.state === null ? '' : location.state.data.deptDate,
        totalSeats: location.state === null ? '' : location.state.data.availableSeats,
        totalCost: location.state === null ? '' : location.state.data.fare
    })
    const handleInput = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setFlightAppData({...flightAppData, [name] : value})
    }
    const addFlightDetails = () =>{
        
        if(Object.values(flightAppData).some(data=> data === '')){
          setErrorMessage('Please Fill all the fields')
        }
        else{
          let url = location.state === null ? 'http://localhost:3001/flightDetails' : `http://localhost:3001/flightDetails/${location.state.data.id}`
          fetch(url,
          {
            method: location.state === null ? "POST" : "PUT",
            body: JSON.stringify({
                flightNumber: flightAppData.flightNumber,
                airline: flightAppData.airlineName,
                from: flightAppData.from,
                to: flightAppData.to,
                deptDate: flightAppData.deptDate,
                availableSeats: flightAppData.totalSeats,
                fare: flightAppData.totalCost,
                status: "Active"
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(res => {
            res.json();
            setModalOpen(true);
            let updatedFlightAppData = flightAppData;
            Object.keys(updatedFlightAppData).forEach(data=> updatedFlightAppData[data] = '');
            setFlightAppData(updatedFlightAppData);
            setErrorMessage('');
          })
          .catch(err => {
            console.log(err)
            setErrorMessage('Error in adding Flight Details')
          });
        }
      }
  return (
    <>
    <div className='add-flight-list'>
        <p className='add-flight-heading'>Schedule Flight</p>
        <p className='error-text'>{errorMessage}</p>
        <div className='schedule-flight-row'>
            <div className='schedule-flight-col'>
                <label htmlFor="flightNumber">Flight Number</label>
                <input type="text" id="flightNumber" value={flightAppData.flightNumber} onChange={handleInput} name="flightNumber" className='input-field-schedule' placeholder="Flight Number" />
            </div>
            <div className='schedule-flight-col'>
                <label htmlFor="airlineName">Airline Name</label>
                <input type="text" id="airlineName" value={flightAppData.airlineName} onChange={handleInput} name="airlineName" className='input-field-schedule' placeholder="Airline Name" />
            </div>
            <div className='schedule-flight-col'>
                <label htmlFor="from">From</label>
                <input type="text" id="from" value={flightAppData.from.toUpperCase()} onChange={handleInput} name="from" className='input-field-schedule' placeholder="From" />
            </div>
            <div className='schedule-flight-col'>
                <label htmlFor="to">To</label>
                <input type="text" id="to" value={flightAppData.to} onChange={handleInput} name="to" className='input-field-schedule' placeholder="To" />
            </div>
            <div className='schedule-flight-col'>
                <label htmlFor="deptDate">Depart Date</label>
                <input type="date" id="deptDate" value={flightAppData.deptDate} onChange={handleInput} name="deptDate" className='input-field-schedule' placeholder="Depart Date" />
            </div>
            <div className='schedule-flight-col'>
                <label htmlFor="totalSeats">Total Seats</label>
                <input type="text" id="totalSeats" value={flightAppData.totalSeats} onChange={handleInput} name="totalSeats" className='input-field-schedule' placeholder="Total Seats" />
            </div>
            <div className='schedule-flight-col'>
                <label htmlFor="totalCost">Ticket Cost</label>
                <input type="text" id="totalCost" value={flightAppData.totalCost} onChange={handleInput} name="totalCost" className='input-field-schedule' placeholder="Ticket Cost" />
            </div>
        </div>
        <button className='login-btn' onClick={addFlightDetails}>Schedule</button>
    </div>
    {modalOpen && <Modal setOpenModal={setModalOpen} textFrom="Flight" />}
    </>
  )
}

export default AddFlight;