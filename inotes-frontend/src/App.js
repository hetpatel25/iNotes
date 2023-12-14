import './App.css';
import React, { useState } from "react";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import Login from './components/Login';
import Signup from './components/Signup';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";


function App() {


  const createNotification = (type, msg) => {
    switch (type) {
      case 'info':
        NotificationManager.info(msg, 'testing', 3000);
        break;
      case 'success':
        NotificationManager.success(msg, '', 3000);
        break;
      case 'warning':
        NotificationManager.warning(msg, '', 3000);
        break;
      case 'error':
        NotificationManager.error(msg, 'Click me!', 5000, () => {
          alert('callback');
        });
        break;
      default:
        break;
    }
  };

  const [progress, setProgress] = useState(0);
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
    <div>
      <LoadingBar
        color='#0D6EFD'
        height={3}
        progress={progress}
      />

      <NoteState createNotification={createNotification} setProgress={setProgress}>
        <BrowserRouter>
          <Navbar createNotification={createNotification} setProgress={setProgress}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home createNotification={createNotification} setProgress={setProgress} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login createNotification={createNotification} setProgress={setProgress} />} />
              <Route path="/signup" element={<Signup createNotification={createNotification} setProgress={setProgress} />} />
            </Routes>
          </div>
          <NotificationContainer />
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
