import React from 'react'
import './Home.css'

const Home = () => {
    const login = JSON.parse(localStorage.getItem('login'));
    let {adminStatus, id, phone, username} = login.adminData;
  return (
    <div className='admin-home'>
        <div className='img-div'>
            <img src="./user.png" alt="Admin" className="user-img" />
            <p className='admin-text'>Admin</p>
        </div>
        <div>
            <table className='home-table'>
                <tbody>
                    <tr>
                        <td>Username</td>
                        <td>{username}</td>
                    </tr>
                    <tr>
                        <td>User Id</td>
                        <td>{id}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>{phone}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{adminStatus}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home