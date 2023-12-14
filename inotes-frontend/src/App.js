import './App.css';
import React, { useState } from "react";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert'
import Login from './components/Login';
import Signup from './components/Signup';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";


function App() {

  const [alert, setAlert] = useState({});

  const showAlert = (msg, type) => {
    setAlert({
      message: msg,
      type: type
    });
   console.log(alert);
    setTimeout(() => {
      setAlert(null)
    }, 1500);

  }

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert = {alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert = {showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert = {showAlert}/>} />
              <Route path="/signup" element={<Signup showAlert = {showAlert}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
