/* eslint-disable */
import React, { useState,useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../api/api';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CRow,
    CFormTextarea
} from '@coreui/react'
import PasswordIcon from 'src/assets/images/eye.svg'
import croosedEyeIcon from 'src/assets/images/eye-crossed-edit.svg'
import './succlogic.css'

const defaultvalue ={
    first_name:"",
    last_name:"",
    role_id:"Agent",
    username:"",
    // contact_no:"",
    email:"",
    password:"",
    // address:"",
}

const AddUser = () => {
    const [popUpmessage, setpopUpmessage] = useState('');
    const [showPassword,setshowPassword]=useState(false)
    const [popState, setpopState] = useState();
    //validation handle
    const [validated, setValidated] = useState(false)
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    //***Admin Authentication***//
    const roleauth = localStorage.getItem('roleId')
    console.log('roleauth',roleauth)

    useEffect(() => {
        if(roleauth==2)
        {
        console.log("Admin Loggin In")
        navigate('/login')
        }
        else if(roleauth==1){
        console.log("Admin Loggin In")
        }
    }, [roleauth])

    //require variable
    const [user,setuser]=useState(defaultvalue);

    const onValueChange = (e) =>{
        setuser({...user,[e.target.name]:e.target.value})
        console.log(user)
    }
    
   const handleSubmit = async(event) => {
        const form = event.currentTarget
        if (form.checkValidity() === true) {
            setValidated(true)
            event.preventDefault()
            const result = await RegisterUser(user)
            console.log(result.status)
            if (result.status === 201) {
                setpopUpmessage('Email already exists');
                setShowModal(true);
                setpopState(false)
            } else if (result.status === 200){
                setpopUpmessage("User Data Inserted Successfully!")
                if(result.data == 'registered'){
                    setShowModal(true);
                    setpopState(true)
                    console.log(result.data);
                    setTimeout(() => {
                        navigate('/all-users')
                    }, 3000);
                }
                else{
                    setpopUpmessage("Theres an error Saving User");
                    setShowModal(true);
                    setpopState(false)
                } 
            }
            console.log('result',result);
        }
        console.log('not valid');
        event.preventDefault()
        event.stopPropagation()
        setValidated(true)
    }
    const routeChange = () =>{ 
        setShowModal(false);

    }
    const handleShowPassword = () => {
        setshowPassword((current) => !current);
    };
    //****************popup start*********************//
    // const [showModal, setShowModal] = useState(false);
    // const openModal = () => {
    //     setShowModal(true);
    // };
    const routechange = ()=>{
        // navigate('/all-users')
        setShowModal(false);
    }
    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
        setShowModal(false);
        navigate('/all-users')
        
        }
    };
    //****************popup end*********************//
    const isPasswordValid = user.password.pattern ==' (?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}';
    const isPasswordEmpty = user.password.length === 0;

    // const isEmailValid = user.email.pattern =='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}';
    const isEmailValid = user.email.pattern =='/^([\w-.]+@(?!gmail\.com|yahoo\.com|hotmail\.com|mail\.com|live\.com|aol\.com|outlook\.com|bol\.com|msn\.com|ymail\.com)([\w-]+.)+[\w-]{2,4})?$/.test(user.email);';
    const isEMailEmpty = user.email.length == 0;

    const isFirstName = user.first_name.length === 0;
    const isFirstNameValid = user.first_name.pattern === "^[A-Za-z]{3,16}";

    const isLastName = user.last_name.length === 0;
    const isLastNameValid = user.last_name.pattern === "^[A-Za-z]{3,16}";
  
    const isUserName = user.username.length === 0;
    const isUserNameValid = user.username.pattern === "^[A-Za-z]{3,16}";

    // const isContactNo = user.contact_no.length === 0;
    // const isContactNoValid = user.contact_no.pattern === "^[0-9]{10,12}" ;
    useEffect(( )=>{},[popUpmessage])
    return(
        <div className='editform-div'>
            {/* {/ <h2>Add New User</h2><br/> /} */}
            <CForm className="row g-3 needs-validation text-start editform" noValidate validated={validated} onSubmit={handleSubmit} >
                <CRow>
                    <CCol xs>
                        <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>First Name</CFormLabel>
                        <CFormInput 
                            // feedbackInvalid="Please Enter Your First Name."
                            feedbackInvalid={
                                isFirstName
                                ? 'Please enter your first name.'
                                : isFirstNameValid
                                ? null
                                : 'Please enter valid first name'
                            }
                            aria-label="First name" 
                            name="first_name"
                            onChange={(e)=>{onValueChange(e)}}
                            className='user-input'
                            pattern="^[A-Za-z]{3,16}" required
                        />
                    </CCol>
                    <CCol xs>
                        <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>Last Name</CFormLabel>
                        <CFormInput 
                            aria-label="Last name" 
                            // feedbackInvalid="Please Enter Your Last name."
                            feedbackInvalid={
                                isLastName
                                ? 'Please enter your last name.'
                                : isLastNameValid
                                ? null
                                : 'Please enter valid last name'
                              }
                            name="last_name"
                            onChange={(e)=>{onValueChange(e)}}
                            className='user-input'
                            pattern="^[A-Za-z]{3,16}" required
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xs>
                        <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>User Name</CFormLabel>
                        <CFormInput 
                            aria-label="User Name" 
                            feedbackInvalid={
                                isUserName
                                ? 'Please enter your user name.'
                                : isUserNameValid
                                ? null
                                : 'Please enter valid user name'
                              }
                            name="username"
                            onChange={(e)=>{onValueChange(e)}}
                            className='user-input'
                            pattern="^[A-Za-z0-9]{3,16}" required
                        />
                    </CCol>
                    <CCol xs>
                        <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>User Role</CFormLabel>
                        <CFormSelect 
                        name='role_id' 
                        className='user-input role-selectBox' 
                        onChange={(e)=>{onValueChange(e)}}
                        >
                            <option  value="Administrator">Administrator</option>
                            <option  value="Agent" selected>Agent</option>
                        </CFormSelect>
                    </CCol>
                    {/* <CCol xs>
                        <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>Contact No.</CFormLabel>
                        <CFormInput 
                            type='text' 
                            // feedbackInvalid="Please Enter Your Contact No."
                            feedbackInvalid={
                                isContactNo
                                ? 'Please Enter Your Contact No.'
                                : isContactNoValid
                                ? null
                                : 'Please Enter Valid Contact No.'
                            }
                            aria-label="Contact No." 
                            name="contact_no"
                            onChange={(e)=>{onValueChange(e)}}
                            className='user-input'
                            pattern="^[0-9]{10,12}" required
                        />
                    </CCol> */}
                </CRow>
                <CRow>
                    <CCol xs>
                        <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>Email</CFormLabel>
                        <CFormInput
                            type="email"
                            feedbackInvalid={
                                isEMailEmpty
                                ? 'Please enter your email.'
                                : isEmailValid
                                ? null
                                : 'Please enter valid email'
                            }
                            aria-label="Email"
                            name="email"
                            onChange={(e)=>{onValueChange(e)}}
                            className='user-input'
                            id="validationCustom03" 
                            // pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$'
                            pattern="^([\w-.]+@(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)(?!mail\.com)(?!live\.com)(?!aol\.com)(?!outlook\.com)(?!bol\.com)(?!msn\.com)(?!ymail\.com)([\w-]+.)+[\w-]{2,4})?$"
                            required
                        />
                    </CCol>
                    <CCol xs className='add_user_pass'>
                        <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>Password</CFormLabel>
                        <CFormInput 
                            aria-label="Password" 
                            // feedbackInvalid="Please Enter Valid Password."
                            type={showPassword  == true ? "text" : "password"}
                            feedbackInvalid={
                                isPasswordEmpty
                                ? 'Please enter your password'
                                : isPasswordValid
                                  ? null
                                  : 'Must enter at least one uppercase letter, lowercase letter, special character and one number'
                                }
                            name="password"
                            onChange={(e)=>{onValueChange(e)}}
                            className='user-input'
                            required
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        />
                        <img src={showPassword==true ? PasswordIcon : croosedEyeIcon} alt="showPassword" className='eyeIcon'  onClick={()=>{handleShowPassword()}}/>
                                {/* <img src={showPassword  == true ? PasswordIcon : croosedEyeIcon} width={25} onClick={()=>{handleShowPassword()}} className={showPassword == true ? "login-input-icon edit-pass-icon" : "login-input-icon edit-pass-icon"}/> */}
                    </CCol>
                </CRow>
                {/* <CRow>
                    <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>User Role</CFormLabel>
                    <CFormSelect 
                    name='role_id' 
                    className='user-input role-selectBox' 
                    onChange={(e)=>{onValueChange(e)}}
                    >
                        <option  value="Administrator">Administrator</option>
                        <option  value="Agent" selected>Agent</option>
                    </CFormSelect>
                    </CCol>
                </CRow> */}
                {/* <CRow>
                    <CCol xs>
                        <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>Address</CFormLabel>
                        <CFormInput 
                            type='text'
                            feedbackInvalid="Please Enter Your Address."
                            // rows="1"
                            name="address"
                            onChange={(e)=>{onValueChange(e)}}
                            className='user-input'
                            pattern='^[0-9A-Za-z -]+$'
                            aria-describedby="inputGroupPrependFeedback"
                            id="validationCustomUsername" required
                        ></CFormInput>
                    </CCol>
                </CRow> */}
                <CRow className='btn-groups'>
                <CCol xs>
                    <button className="AddUserBtn save-btn" type='submit'>Save</button>
                    <button className="AddUserBtn cancel-btn" onClick={routeChange}>Cancel</button>

                    {showModal ? 
                      <div className="model-div" ref={modalRef} onClick={closeModal}>
                      <div className="modal">
                          <button onClick={() => setShowModal(false)} className='popup-close'>X</button> 
                          <div className='popup-text-div'>
                              <div className='signtep' style={{marginTop:'-16px'}}>
                                  {popState ? (
                                  <svg class="checkmark mb-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                                  ) : (
                                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                                      <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                                      <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>
                                      <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>
                                  </svg>
                                  )}
                              </div>
                              <p>{popUpmessage}</p>
                              <button className="popup-close-btn" onClick={routechange}>Close</button>
                          </div>
                      </div>
                  </div>
                    : null
                    }
                </CCol>
                </CRow>
            </CForm>
        </div>
        
    )
}
export default AddUser