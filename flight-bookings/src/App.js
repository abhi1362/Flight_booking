import './App.css';
import React, { useState } from 'react';
import Login from './loginPage/Login'
import Header from './Header/Header';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from './AdminPage/AdminPage';

function App() {
  const [isLogin, setIsLogin] = useState(false)
  return (
    <BrowserRouter>
    <div className="App">
      <Header isLogin={isLogin} setIsLogin={setIsLogin}/>
      <Routes>
          <Route
            path="/"
            element={
              <Login isLogin={isLogin} setIsLogin={setIsLogin}/>
            }
          />
          <Route
            path="/admin/*"
            element={<AdminPage isLogin={isLogin} setIsLogin={setIsLogin}/>}
          />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
