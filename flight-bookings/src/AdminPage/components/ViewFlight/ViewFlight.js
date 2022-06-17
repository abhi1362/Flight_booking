import React, { useState, useEffect } from 'react'
import './ViewFlight.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

const ViewFlight = () => {
    const [flightData, setFlightData] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:3001/flightDetails')
            .then(res => res.json())
            .then(data => {
                setFlightData(data);
            }).catch(err=>{
                console.log(err);
            })
    }, []);
    const deleteFlightData = (id) =>{
        const updatedData = flightData.filter( el => el.id !== id);
        fetch(`http://localhost:3001/flightDetails/${id}`,
        {
            method: "DELETE"
        })
        .then(res => {
            res.json();
            setFlightData(updatedData);
        })
        .catch(err => console.log(err));
    }
    const editFlightDeatils = (data) =>{
        navigate('../addFlight',{ state : { data }})
    }
  return (
    <div className='view-flight-list'>
        <table className='view-flight-table'>
            <thead>
                <tr>
                    <th>Flight Number</th>
                    <th>Airline</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Dept Date</th>
                    <th>Available Seats</th>
                    <th>Fare</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {flightData.map(data=>{
                    return(
                        <tr key={data.id}>
                            <td>{data.flightNumber}</td>
                            <td>{data.airline}</td>
                            <td>{data.from}</td>
                            <td>{data.to}</td>
                            <td>{data.deptDate}</td>
                            <td>{data.availableSeats}</td>
                            <td>{data.fare}</td>
                            <td>{data.status}</td>
                            <td><FontAwesomeIcon icon={faPenToSquare} className="edit-icon" onClick={()=>editFlightDeatils(data)}/> <FontAwesomeIcon icon={faTrash} className="trash-icon-view-flight" onClick={()=>deleteFlightData(data.id)}/></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default ViewFlight