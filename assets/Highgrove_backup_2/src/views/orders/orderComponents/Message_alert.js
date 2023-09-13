/* eslint-disable */
import crossIcone from "src/assets/images/cross.gif"

const Message_alert = (props)=>{
    const {text}=props;
const hideAlert= ()=>{
    props.disableSuccsess();
}
    return(
        <div>
           <div className="model-div delete-popup">
                      <div className="modal">
                        <button onClick={hideAlert} className="popup-close">
                          X
                        </button>
                        <img src={crossIcone} style={{ width: '80%', height: 'auto' }} />
                        <p>
                          <br />
                          <strong>{text}</strong>
                        </p>
                      </div>
                    </div>
        </div>
    )
}

export default Message_alert;