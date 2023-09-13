/* eslint-disable */
import { getAccesstoken } from 'src/views/api/api'
import { useParams } from 'react-router-dom';
import Message_alert from "../../orders/orderComponents/Message_alert"
import Success from "../../../assets/images/successfully-done.gif"
const connectSage = () =>{
    const { code } = useParams();
    const [alertStatus, setAlertStatus] = useState(false)
    const [alertText, setAlertText] = useState("Failed to fetch data");
    const [showSuccess, setShowSuccess] = useState(false)
    const [popUpmsg, SetpopUpmsg] = useState("Token has been Updated")
    console.log(code);
    console.log("................");
    const connectToSage = async()=>{
        await getAccesstoken().then((res)=>{
            if((res.status === 200)){
              // alert("Token has been Updated")
              SetpopUpmsg("Token has been Updated")
              setShowSuccess(true)
              // add pop up to show token has been updated
            }else{
              console.log('There is an error please try again')
              // alert("There has been error", 'please try algain or try to Connect again')
              setAlertStatus(true)
              setAlertText("There has been error please try algain or try to Connect again")
            }
          })
    }
    const disableAelrt = () => {
      setAlertStatus(false)
    }
    return (
        <div className="menu-item">
          <div className="sage-connection">
            <div>
            <a className="refresh-button" href="https://id.sage.com/authorize?audience=s200ukipd/sage200&response_type=code&client_id=Ewzt9XLpuAitj2dsCP7J8WA8ueneUHzn&state=yes&scope=openid%20profile%20email%20offline_access&redirect_uri=https://highgrove.sincprojects.com/getToken">
              <span className="button-text">
                <i className="bi bi-lock fs-3"></i> Connect to Sage
              </span>
            </a>
            </div>
            <div>
            <button id="Sagebtn" onClick={() => { connectToSage() }}>
              Refresh your token
            </button>
            </div>
          </div>
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
        </div>
      );
      
}

export default connectSage;