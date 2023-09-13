/* eslint-disable */
import { useLocation } from 'react-router-dom';
import { getAccesstoken } from 'src/views/api/api';
import Message_alert from "../../orders/orderComponents/Message_alert"
import Success from "../../../assets/images/successfully-done.gif"
import { useState } from 'react';
const getToken = ()=>{
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');
  const [alertStatus, setAlertStatus] = useState(false)
  const [alertText, setAlertText] = useState("Failed to fetch data");
  const [showSuccess, setShowSuccess] = useState(false)
  const [popUpmsg, SetpopUpmsg] = useState("Token has been Updated")
  const getAccessTokenCall = async()=>{
    await getAccesstoken({'code': code}).then((res)=>{
      if((res.status === 200)){
        console.log("date fetched")
        // alert("Token has been generated")
        SetpopUpmsg("Token has been generated")
        setShowSuccess(true)
      }else{
        console.log('There is an error please try again')
        // alert("There is an error please try again")
        setAlertStatus(true)
        setAlertText("There is an error please try again")
      }
    })
}
  if(code){
    //make API call
    getAccessTokenCall();

  }else{
    //do nothing
  }
  const disableAelrt = () => {
    setAlertStatus(false)
  }
    return(
        <>
        hello from GetToken
        {
        alertStatus ?
          <Message_alert text={alertText} disableSuccsess={disableAelrt}></Message_alert> : ""
      }
      {showSuccess ? (
        <div className="model-div delete-popup">
          <div className="modal">
            <button onClick={() => setShowSuccess(false)} className="popup-close">
              X
            </button>
            <img src={Success} style={{ width: '80%', height: 'auto' }} />
            <p>
              <br />
              <strong style={{color:"black"}}>{popUpmsg}</strong>
            </p>
          </div>
        </div>
      ) : null}
        </>
    )
}

export default getToken;