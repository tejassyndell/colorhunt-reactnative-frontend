/* eslint-disable */
import React, { useState, useEffect } from 'react'
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

import { loginAuth, authUser, setNewPassword } from 'src/views/api/api';


  // to get email anfd token from url
  const queryParameters = new URLSearchParams(window.location.search)
  const emailID = queryParameters.get("id")
  const SecurityToken = queryParameters.get("token")
  console.log(emailID);
  const JWT_secret = "5ea4ba0fe6803e201c321c02f09fe9c8bb451cdfce398dec0c36e3643c586e6d"
  const uniToken = `${JWT_secret}${emailID}`

const defaultvalue ={
  newPassword:'',

}

const ResetPassword = () => {
   //require variable
    const Navigate = useNavigate();
    const [user,setuser]=useState(defaultvalue);
    const [notUser,setnotUser]=useState(false)
    const [showPassword1,setshowPassword1]=useState(false)
    const [showPassword2,setshowPassword2]=useState(false)
    const [isValidPassword, setisValidPassword] = useState(false)
    const [islength, setLength] = useState(false)
    const [isspecarector, setspecarector] = useState(false)
    const [isConValidPassword, setConValidPassword] = useState(false)
    const [isMatchPassword, setMatchPassword] = useState(false)
    const [inputvalue,setInputValue]=useState(false)
    const [passwrong,setpasswrong] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [password, setPassword] = useState('')
    const [ConfirmPass, setConfirmPass] = useState('')

    const credData = {
      token : SecurityToken,
      unitok : uniToken
    }

    //API call to check user valid or not
    const checkUser = async()=>{

      console.log(SecurityToken);
      await authUser(credData).then((res) => {
        if(res.status === 200){
          console.log("user authentic");
          //show error here that user is not authentic
        }else{
          console.log("user not authentic");
          Navigate('/')
        }
      })
    }
   



    const checkParams = ()=>{
      console.log(emailID)
      if(!emailID){
        // Navigate('/')
      }else{
        checkUser();
      }
      }
      useEffect(() =>{
        checkParams();
      },[] )

      //API call
      const changePassword = async ()=>{
        console.log(user);
        await setNewPassword(user).then((res) => {
          if(!(res.status === 201)){
            //show success meassage here
            console.log("PassWord Updated")
            Navigate('/')
          }else{
            //show error
            console.log('Password not updated Please try again later')
          }
        })
      }


    const handleShowPassword1 = () => {
      setshowPassword1((current) => !current);
    };
    const handleShowPassword2 = () => {
      setshowPassword2((current) => !current);
    };


  //for validations and handle api
  const [validated, setValidated] = useState(false)

  //pass val
  const [passwordValue, setPasswordValue] = useState('');
  const handlePasswordChange = (event) => {
    // setPasswordValue(event.target.value);
  };

  const getPassword = (e) => {
    setPasswordValue(e.target.value);
    setuser({ ...user, [e.target.name]: e.target.value, 'email': emailID})
    setPassword(e.target.value)
  };
  const getConfirmPassword = (e) =>{
    setConfirmPass(e.target.value)
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget
   // console.log(form);
    if (form.checkValidity() === true) {
      setValidated(true)
      event.preventDefault()
      console.log(user)
    }
    // console.log('not valid')
    event.preventDefault()
    event.stopPropagation()
    setValidated(true)
  }
    const resetPassword = async () => {
      //API call to update password


    if(passwordValue.trim().length === 0){
      setisValidPassword(true)
      setConValidPassword(true)

  }else{
      setisValidPassword(false)
      if(ConfirmPass.trim().length === 0){
        setConValidPassword(true)
      }else{
        setConValidPassword(false) 

      if(passwordValue.trim().length < 8){
          setLength(true)
      }else{
          setLength(false)
        if (!(/[!@#\$%\^\&*]/.test(passwordValue))){
            setspecarector(true)
        }else{
          setspecarector(false)
          if(!(password === ConfirmPass)){
            setMatchPassword(true)
          }else{
            changePassword();
            setMatchPassword(true)
            setMatchPassword(false)
          }
        }              
        }
      }
      }

    
  }
  // const routerchange = () =>{
  //   Navigate('/ForgotPass')
  // }
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
                    <h3 className="mb-4 text-white">Change Password</h3>
                    <CInputGroup className="mb-4 resetfield">
                    <img src={PasswordIcon} onClick={()=>{handleShowPassword1()}} className={showPassword1 == true ? "login-input-icon pass-icon showpassicon" : "login-input-icon pass-icon showpassicon"}/>
                      <CFormInput
                        type={showPassword1  == true ? "text" : "password"}
                        placeholder="New Password"
                        // autoComplete="current-password"
                        name='newPassword' 
                        onChange={(e)=>{getPassword(e)}}
                        className='form-input password-input'
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4 resetfield">
                    <img src={PasswordIcon} onClick={()=>{handleShowPassword2()}} className={showPassword2 == true ? "login-input-icon pass-icon showpassicon" : "login-input-icon pass-icon showpassicon"}/>
                      <CFormInput
                        type={showPassword2  == true ? "text" : "password"}
                        placeholder="Confirm Password"
                        autoComplete="current-password"
                        name='confirm-password' 
                        // onChange={(e)=>{onValueChange(e);setPasswordValue(e.target.value);}}
                        onChange={getConfirmPassword}
                        className='form-input password-input'
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        required
                      />
                    </CInputGroup>
                    <CCol xs={12} >
                      <p className="px-0">
                        {isValidPassword && (<p style={{textAlign: "left",color: "#e55353"}}>Please Enter Password.</p>)}  
                        {islength && (<p style={{textAlign: "left",color: "#e55353"}}>Please Enter min 8 corrector.</p>)}
                        {isspecarector && (<p style={{textAlign: "left",color: "#e55353"}}>Must enter at least one uppercase letter, lowercase letter, special character and one number.</p>)}
                        {isMatchPassword && (<p style={{textAlign: "left",color: "#e55353"}}>Password Not Matched!</p>)}
                      </p>
                      </CCol>
                    <CRow>
                      <CCol xs={12}>
                        <button type="submit" className="login-btn" onClick={resetPassword}>
                          Save
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

export default ResetPassword