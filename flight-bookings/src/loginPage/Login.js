import React, { useState, useEffect } from 'react'
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = ({isLogin, setIsLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    
    let navigate = useNavigate();
    useEffect(() => {
        const login = localStorage.getItem('login');
        if(login){
          let auth = JSON.parse(localStorage.getItem('login'));
          setIsLogin(auth.userLogin);
        }
        else{
          setIsLogin(false)
        }
        if(!isLogin){
          navigate('/')
        }
        else{
            navigate('/admin')
        }
      }, [navigate,isLogin,setIsLogin])
    const validateLogin = (e) =>{
        e.preventDefault();
        // let formData = {
        //     username,
        //     password
        // }
        if(username === '' || password === ''){
            setErrMessage('Please Enter Username and Password to proceeed');
        }
        else{
            // http://localhost:5000/api/auth/login
            // fetch('http://localhost:5000/api/auth/login', {
            //     method: 'POST',
            //     headers: {'Content-Type' : 'application/json'},
            //     body: JSON.stringify(formData)
            // })
            // .then(res => res.json())
            // .then(data => {
            //     if(data.status === 200){
            //         localStorage.setItem(
            //             "login",
            //             JSON.stringify({
            //                 userLogin: true,
            //                 token: data.access_token,
            //             })
            //         );
            //         setErrMessage('');
            //         navigate("/admin");
            //     }else{
            //         navigate("/")
            //         setErrMessage('Username or Password is incorrect');
            //     }
            // }).catch(err=>{
            //     console.log(err);
            //     setErrMessage('Username or Password is incorrect');
            //     navigate("/")
            // })
            fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then(data => {
                let loginStatus = data.findIndex((user) => user.username === username && user.password === password) !== -1;
                if(loginStatus){
                    localStorage.setItem(
                        "login",
                        JSON.stringify({
                            userLogin: true,
                            adminData: data.find((user) => user.username === username && user.password === password)
                        })
                    );
                    setErrMessage('');
                    navigate("/admin"); 
                }
                else{
                    navigate("/")
                    setErrMessage('Username or Password is incorrect');
                }
            }).catch(err=>{
                console.log(err);
                setErrMessage('Error in accessing server!');
                navigate("/")
            })
        }
    }
  return (
    <div>
        <div className="center">
            <div className='login-div'>
                <p className='heading-login'>Login</p>
                <p className='error-text'>{errMessage}</p>
                <div className="txt_field">
                    <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} onKeyPress={e => e.key === 'Enter' ? validateLogin(e) : null } />
                    <span></span>
                    <label>Username</label>
                </div>
                <div className="txt_field">
                    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} onKeyPress={e => e.key === 'Enter' ? validateLogin(e) : null } />
                    <span></span>
                    <label>Password</label>
                </div>
                <button className='login-btn' onClick={validateLogin} tabIndex={0}>Login Now</button>
                <div className="signup_link">
                    New to Flight Booking? <span className='create-acc-text'>Create an account</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login;