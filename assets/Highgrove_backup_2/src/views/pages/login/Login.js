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
import crossedIcon from "../../../assets/images/eye-crossed.svg"
import { cilLockLocked, cilUser } from '@coreui/icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loginAuth } from 'src/views/api/api';

const defaultvalue ={
  email:'',
  password:'',
}

const Login = () => {
   //require variable
    const Navigate = useNavigate();
    const [user,setuser]=useState(defaultvalue);
    const [notUser,setnotUser]=useState(false)
    const [showPassword,setshowPassword]=useState(false)
    const [passwrong,setpasswrong] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [message,setmessage] = useState('');
    console.log('message:',message)

    const onValueChange = (e) =>{
      setuser({...user,[e.target.name]:e.target.value})
      // setInputValue(e.target.value);
      console.log(user.password);
    }
    const userProfile = user.email;
    const userPass = user.password ;

    const handleShowPassword = () => {
      setshowPassword((current) => !current);
      console.log('clicked')
    };
  
  //tostify notifcation
  const notify = (e) => { toast(e+ " loagged in !"); }

  //for validations and handle api
  const [validated, setValidated] = useState(false)

  //pass val
  const [passwordValue, setPasswordValue] = useState('');
  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };
  const isPasswordValid = passwordValue.pattern ==' (?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}';
  const isPasswordEmpty = passwordValue.length === 0;
  const isEmailValid = user.email.pattern ==' ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}';
  const isEMailEmpty = user.email.length === 0;

  const handleSubmit = async(event) => {
    const form = event.currentTarget
      if (form.checkValidity() === true) {
        setValidated(true)
        // Set isValid to true if the input value is not empty
        setIsValid(event.target.value !== '');

        event.preventDefault()
        await loginAuth(user)
        .then((res)=>{
          localStorage.setItem("userEmail",userProfile)
          localStorage.setItem("roleAuth","user")

          console.log('*******user res*******',res.data)

          if(res.data != ''){
            if(res.data[0].role_id == 'Agent'){
              localStorage.setItem('roleId','Agent');
              localStorage.setItem('userId',res.data[0].id);
              localStorage.setItem('name',res.data[0].first_name);

              Navigate('/dashboard')
            }
            else if(res.data[0].role_id == 'Administrator'){
              localStorage.setItem('roleId','Administrator');
              localStorage.setItem('userId',res.data[0].id);
              localStorage.setItem('name',res.data[0].first_name);
              Navigate('/dashboard')  
              window.location.reload()
            }
            else if(res.data == 'wrong password'){
              console.log('Password Wrong')
              setmessage('Invalid Password')
            }
            else if(res.data == 'Not Exist'){
              console.log("User Does not Exist!")
              setmessage('Invalid Email or Password')
              // setmessage('User Does not Exist!')
            }else{
              console.log("else part")
            }
          }
          
        })
      }
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
  }
  const routerchange = () =>{
    Navigate('/forgotpassword')
  }
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center login-background">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-5 form-div">
                <CCardBody>
                  <CForm noValidate validated={validated} onSubmit={handleSubmit} className='login-form'>
                    <img src={logo} className='logoImg'/>
                    <CInputGroup className="mb-4">
                    <img src={EmailIcon} id="email-icon" className='login-input-icon email-icon'/>
                    
                      <CFormInput 
                        type='email'
                        feedbackInvalid={
                          isEMailEmpty
                          ? 'Please Enter Email.'
                          : isEmailValid
                          ? null
                          : 'Please Enter Valid Email'
                        }
                        
                        // feedbackInvalid="Please Enter Your Email."
                        placeholder="Email" 
                        // autoComplete="email" 
                        name='email' 
                        onChange={(e)=>{onValueChange(e)}} 
                        autoComplete='off'
                        className='form-input email-input loginoinputsfield'
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}"
                        required
                      />
                    </CInputGroup>
                    {/* <img src={PasswordIcon} onClick={()=>{handleShowPassword()}} className={showPassword == true ? "login-input-icon pass-icon" : "login-input-icon pass-icon"}/> */}
                    <img src={showPassword == true ? PasswordIcon : crossedIcon} onClick={()=>{handleShowPassword()}} className={showPassword == true ? "login-input-icon pass-icon1" : "login-input-icon pass-icon"}/>
                    <CInputGroup className="mb-0">
                      <CFormInput
                        type={showPassword  == true ? "text" : "password"}
                        value={passwordValue}
                        feedbackInvalid={
                          isPasswordEmpty
                            ? 'Please Enter Your Password.'
                            : isPasswordValid
                            ? null
                            : 'Must enter at least one uppercase letter, lowercase letter, special character and one number'
                        }
                        placeholder="Password"
                        autoComplete="off"
                        name='password' 
                        onChange={(e)=>{onValueChange(e);setPasswordValue(e.target.value);}}
                        className='form-input password-input'
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        required
                      />
                    </CInputGroup>
                    
                    <CRow className='login-error-box-raw'>
                      <CCol xs={12} className="col-12 forgot-pass user-error-msg login-error-box" >
                        <p className="px-0 user-error-msg">{message}</p>
                        <button color="link" type='button' style={{ background:'none',border:'none' }} className="px-0 forgot-pass login-forgot-btn" onClick={routerchange} >
                          Forgot password?
                        </button>
                      </CCol>
                      {/* <CCol xs={12} className="text-right">
                      </CCol> */}
                    </CRow>
                    <CRow>
                      <CCol xs={12}>
                        <button type="submit" className="login-btn" >
                          Login
                        </button>
                      </CCol>
                    </CRow>
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

export default Login