import React, { useState, useEffect } from 'react'
import './ViewAirport.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

const ViewAirport = () => {
    const [airportData, setAirportData] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:3001/airportDetails')
            .then(res => res.json())
            .then(data => {
                setAirportData(data);
            }).catch(err=>{
                console.log(err);
            })
    }, [])
    const deleteAirportData = (id) =>{
        const updatedData = airportData.filter( el => el.id !== id);
        fetch(`http://localhost:3001/airportDetails/${id}`,
        {
            method: "DELETE"
        })
        .then(res => {
            res.json();
            setAirportData(updatedData);
        })
        .catch(err => console.log(err));
    }
    const editAirportDeatils = (data) =>{
        navigate('../addAirport',{ state : { data }})
    }
  return (
    <div className='view-airport-list'>
        <table className='view-airport-table'>
            <thead>
                <tr>
                <th>Airport Code</th>
                <th>Airport State</th>
                <th>Airport Name</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {airportData.map(data=>{
                    return(
                        <tr key={data.id}>
                            <td>{data.airportCode}</td>
                            <td>{data.airportState}</td>
                            <td>{data.airportName}</td>
                            <td><FontAwesomeIcon icon={faPenToSquare} className="edit-icon" onClick={()=>editAirportDeatils(data)}/> <FontAwesomeIcon icon={faTrash} className="trash-icon" onClick={()=>deleteAirportData(data.id)} /></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default ViewAirport