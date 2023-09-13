/* eslint-disable */
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import logo from '../../../assets/images/LogoImg.png'
import EmailIcon from '../../../assets/images/Email-icon.png'
import PasswordIcon from '../../../assets/images/Password-icon.png'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userExist, sendMail } from 'src/views/api/api'
import DataUpdateGif from 'src/assets/images/successfully-done.gif'

import axios from 'axios';
// const url = 'http://localhost:8090'
// const url = 'https://highgrove.sincprojects.com/'
// const url = 'https://highgrove-two.sincprojects.com/'
const url = 'http://192.168.2.199:3000'

const defaultvalue = {
  email: '',
}

const ForgotPass = () => {
    //require variable
    const Navigate = useNavigate();
    const [user, setuser] = useState(defaultvalue)
    const [notUser, setnotUser] = useState(false)
    const [message,setmessage] = useState({success : "test", error : " "});
    const [showModal, setShowModal] = useState(false);


    const [userExists, setuserExists] = useState(false)

    const onValueChange = (e) => {
      setuser({ ...user, [e.target.name]: e.target.value })
    }

    const isEmailValid = user.email.pattern ==' ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}';
    const isEMailEmpty = user.email.length === 0;
     
    //for validations and handle api
    // const [validated, setValidated] = useState(false)
    // const [email, setEmail] = useState('');
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try{
    //         // Send request to the back-end API
    //         const response = await axios.post(`${url}/forgotpassword`, { email });
    //         // Handle successful response
    //         console.log(response.data);
    //     }
    //     catch(error){
    //         console.error(error);
    //     }
    // }
    // const routerchange = () =>{
    //   Navigate('/ForgotPass')
    // }

    //SEND MAIL API CALL

    const sendEmail = async(e)=>{
      await sendMail(user).then((res)=>{
        if(res.status === 200){
          console.log("Mail has been sent")
          setmessage({success : `Mail has been sent \n Please check your inbox` })
          setTimeout(() => {
          setmessage({success : ""})
          }, 50000000);
        }else{
          console.log('There is an error please try again')
        }
      })
    }

    //for validations and handle api
    const [validated, setValidated] = useState(false)
    const handleSubmit = async (event) => {
      const form = event.currentTarget
      if (form.checkValidity() === true) {
        setValidated(true)
        event.preventDefault()
        await userExist(user).then((res) => {
        if(!(res.status === 201)){
          console.log('user exits');
          sendEmail();
          // Navigate('/login')
        }else{
          // Navigate('/login')
          setmessage({error : "User Does Not Exist!"})
          setTimeout(() => {
          setmessage('')
          }, 5000);
        }
        })
      }
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    }
 
    return (
     <div className="min-vh-100 d-flex flex-row align-items-center login-background">
       <CContainer>
         <CRow className="justify-content-center">
           <CCol md={5}>
             <CCardGroup>
               <CCard className="p-4 form-div">
                 <CCardBody>
                   <CForm noValidate validated={validated} className='login-form' onSubmit={handleSubmit} >
                     <img src={logo} className='logoImg'/>
                     <h6 className="mb-4 text-white">Forgot your password? Please enter your email address. <br/> You will receive a link to create a new password via email.</h6>
                     <CInputGroup className="mb-3">
                     <img src={EmailIcon} className='login-input-icon email-icon'/>
                     {notUser == true ? (
                        <>
                          <span className="login_span_notFound">Email not found</span>
                        </>
                      ) : (
                        <></>
                      )}    
                       <CFormInput 
                         type='email'
                        //  feedbackInvalid="Please Enter Your Email."
                        feedbackInvalid={
                          isEMailEmpty
                          ? 'Please Enter Email.'
                          : isEmailValid
                          ? null
                          : 'Please Enter a Valid Email ID'
                        }
                         placeholder="Email" 
                         autoComplete="user-email" 
                         name='email' 
                        //  value={email}
                        onChange={(e) => {
                          onValueChange(e)
                        }}
                         className='form-input  email-input'
                         pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}"
                         required
                       />
                     </CInputGroup>                 
                     <CRow>
                     <CRow className='success-msg-row'>
                      <CCol xs={12} className="col-12 text-center forgot-pass user-error-msg">
                        <p className={message.error ? ("px-0 user-error-msg") : ("px-0 use_success_msg")} >{message.error ? (message.error) : message.success ?(message.success) : null}</p>
                      </CCol>
                    </CRow>
                     <CCol xs={12}>
                        <button type="submit" className="login-btn mb-4" >
                        Send Email
                        </button>
                      </CCol>
                      <a href='/' className="backlogin text-white"><h5>Back To Login</h5></a>
                     </CRow>

                     {/* <CRow className='btn-group'>
                <CCol xs>
                        {showModal ? 
                            <div className="model-div insert-popup">
                                <div className="modal">
                                    <button onClick={closePopUp} className='popup-close'>X</button> 
                                    <div className='popup-text-div'>
                                        <img src={DataUpdateGif} className='data-update-gif'/>
                                        <p>Mail has been sent <br/>Please check your inbox</p>
                                        <button className="popup-close-btn" onClick={closePopUp}>Close</button>
                                    </div>
                                </div>
                            </div>
                        : null 
                        }                    
                </CCol>
          </CRow> */}
                   </CForm>
                 </CCardBody>
               </CCard>
             </CCardGroup>
           </CCol>
         </CRow>
       </CContainer>
       <ToastContainer />
     </div>
   )
 }
 
 export default ForgotPass