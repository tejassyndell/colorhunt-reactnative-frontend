import logo from './logo.svg';
import './App.css';
import { messaging } from './firebase';
import { getToken } from 'firebase/messaging';
import axios from 'axios';
import { useState } from 'react';


function App() {
  const url = 'http://localhost:8020'


  const [tokenText,setTokenText]=useState();
  const getNotification = async (registrationToken) => {
    try {
      const token = {
        registrationToken: registrationToken
      }
    const rsult =   await axios.post(`${url}/getNotification`, token)
    console.log(rsult)
  
    } catch (err) {
      console.log("errorr in axios");
    }
    // console.log(data);
  }
  const requestPermisson = async () => {
    const permison = await Notification.requestPermission();
    if (permison === "granted") {
      // Generate token
      const token = await getToken(messaging, { vapidKey: 'BDzFUkSwGLi58F6AFXVhf7ybONURIh1rCMgZX8qP11aAikPj7LwXXZm1kvelex37dNXt2ZKit64uP4yTVA2BQ3M' });
      setTokenText(token)
      console.log(token)
      getNotification(token);
      // sendNotificationapi(token);

    } else if (permison === "denied") {
      alert("notification denied")
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Send Notification using cordova.
        </p>
        <h4>{tokenText!==undefined?tokenText:""}</h4>
        <button className="button" onClick={requestPermisson}><span>Send Notification </span></button>
      </header>
    </div>
  );
}

export default App;
