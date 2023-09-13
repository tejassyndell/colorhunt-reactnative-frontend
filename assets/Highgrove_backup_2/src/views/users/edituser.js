/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate,useParams  } from 'react-router-dom'
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
import { GetUserDetails, UpdateUserdetais } from 'src/views/api/api'
import PasswordIcon from 'src/assets/images/eye.svg'
import croosedEyeIcon from 'src/assets/images/eye-crossed-edit.svg'
import DataUpdateGif from 'src/assets/images/successfully-done.gif'
import './succlogic.css'



const EditUser = () => {
    const navigate = useNavigate();
    const [showPassword,setshowPassword]=useState(false)
    const handleShowPassword = () => {
        setshowPassword((current) => !current);
    };
    //***Admin Authentication***//
    const roleauth = localStorage.getItem('roleId')
    useEffect(() => {
        if(roleauth==2)
        {
        // console.log("Admin Loggin In")
        navigate('/login')
        }
        else if(roleauth==1){
        // console.log("Admin Loggin In")
        }
    }, [roleauth])

    //Get RoleId from LocalStorage
    const userId = localStorage.getItem('userId')
    const intialValues = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        // contact_no: '',
        password: '',
        // address: '',
    }
    const [validated, setValidated] = useState(false)
    const [state, SetState] = useState(intialValues)
    const [showModal, setShowModal] = useState(false);
    console.log('asdfgh',state.first_name)
    
    // const navigate = useNavigate()
    const onValueChange = (e) => {
        SetState({ ...state, [e.target.name]: e.target.value })
        console.log(state.password)
    }
    const { ID } = useParams()
    console.log(`id is ${ID}`)
    const fetchUserDetails = async () => {
        const result = await GetUserDetails(ID)
        console.log('fetch user by id',result.data)
        SetState({ ...result.data })
    }
    useEffect(() => {
        fetchUserDetails()
    }, [ID])

    const onClickUpdate = async (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === true) {
            setValidated(true)
            event.preventDefault()
            const result = await UpdateUserdetais(state)
            console.log('response',result)
            setShowModal(true);
            if(result.status === 200){
                setTimeout(() => {
                    navigate('/all-users')
                }, 3000);
            }
        }
        event.preventDefault()
        event.stopPropagation()
        setValidated(true);
        // window.location.reload();
    }
    
    const routechange = ()=>{
        navigate('/all-users')
    }
    //****************popup start*********************//
    // const [showModal, setShowModal] = useState(false);
    // const openModal = () => {
    //     setShowModal(true);
    // };
    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
        // setShowModal(false);
        navigate('/all-users')
        }
    };
    //****************popup end*********************//
    // const isPasswordEmpty = state.password.length === 0;
    const isPasswordEmpty = state.password === 0;
    const isPasswordValid = state.password.pattern === ' (?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}';

    const isEmailValid = state.email.pattern ==' ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}';
    const isEMailEmpty = state.email.length === 0;

    const isFirstName = state.first_name.length === 0;
    const isFirstNameValid = state.first_name.pattern === "^[A-Za-z]{3,16}";

    const isLastName = state.last_name.length === 0;
    const isLastNameValid = state.last_name.pattern === "^[A-Za-z]{3,16}";

    // const isContactNo = state.contact_no.length === 0;
    // const isContactNoValid = state.contact_no.pattern === "^[0-9]{10,12}" ;

    return(
        <div className='editform-div'>
            <h2>Edit User</h2><br/>
            <CForm className="row g-3 needs-validation text-start editform" noValidate validated={validated} onSubmit={onClickUpdate}>
                <CRow>
                    <CCol xs>
                        <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>First Name</CFormLabel>
                        <CFormInput aria-label="First name" 
                            type="text"
                            // feedbackInvalid="Please Enter Your First Name."
                            feedbackInvalid={
                                isFirstName
                                ? 'Please enter first name'
                                : isFirstNameValid
                                ? null
                                : 'Please enter valid first name'
                            }
                            name="first_name"
                            value={state.first_name}                            
                            onChange={(e) => { onValueChange(e)}}
                            className='user-input'
                            pattern="^[A-Za-z]{3,16}" 
                            required
                        />
                    </CCol>
                    <CCol xs>
                        <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>Last Name</CFormLabel>
                        <CFormInput aria-label="Last name" 
                            type="text"
                            name="last_name"
                            // feedbackInvalid="Please Enter Your Last name."
                            feedbackInvalid={
                                isLastName
                                ? 'Please enter last name'
                                : isLastNameValid
                                ? null
                                : 'Please enter valid last name'
                            }
                            value={state.last_name}
                            onChange={(e) => { onValueChange(e)}}
                            className='user-input'
                            pattern="^[A-Za-z]{3,16}" 
                            required
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xs>
                        <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>User Name</CFormLabel>
                        <CFormInput  aria-label="User Name" 
                            type="text"
                            name="username"
                            feedbackInvalid="Please enter your username"
                            value={state.username}
                            onChange={(e) => { onValueChange(e)}}
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
                        // defaultValue={state.role_id}
                        >
                            <option value="Administrator" selected={(state.role_id === 'Administrator') ? 'selected' : ''}>Administrator</option>
                            <option value="Agent" selected={(state.role_id === 'Agent') ? 'selected' : ''}>Agent</option>
                        </CFormSelect>
                    </CCol>
                    {/* <CCol xs>
                        <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>Contact No.</CFormLabel>
                        <CFormInput  aria-label="Contact No." 
                            type='tel'
                            name="contact_no"
                            // feedbackInvalid="Please Enter Your Contact No."
                            feedbackInvalid={
                                isContactNo
                                ? 'Please Enter Your Contact No.'
                                : isContactNoValid
                                ? null
                                : 'Please Enter Valid Contact No.'
                            }
                            value={state.contact_no}
                            onChange={(e) => { onValueChange(e)}}
                            className='user-input'
                            pattern="^[0-9]{10,12}" required
                        />
                    </CCol> */}
                </CRow>
                <CRow>
                    <CCol xs>
                        <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>Email</CFormLabel>
                        <CFormInput aria-label="Email" 
                            type='email'
                            name="email"
                            feedbackInvalid={
                                isEMailEmpty
                                ? 'Please enter email'
                                : isEmailValid
                                ? null
                                :"Please enter valid email"
                            }
                            value={state.email}
                            
                            onChange={(e) => { onValueChange(e)}}
                            className='user-input'
                            required
                        />
                    </CCol>
                    <CCol xs className='add_user_pass'>
                        <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>Password</CFormLabel>
                        <CFormInput  aria-label="Password" 
                            type={showPassword  == true ? "text" : "password"}
                            name="password"
                            value={state.password}
                            onChange={(e) => { onValueChange(e)}}
                            className='user-input'
                            feedbackInvalid={
                                isPasswordEmpty
                                  ? 'Please enter your password'
                                  : isPasswordValid
                                  ? null
                                  : 'Must enter at least one uppercase letter, lowercase letter, special character and one number'
                              }
                              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required

                        />
                        {/* <img src={showPassword  == true ? PasswordIcon : croosedEyeIcon} width={25} onClick={()=>{handleShowPassword()}} className={showPassword == true ? "login-input-icon edit-pass-icon" : "login-input-icon edit-pass-icon"}/> */}
                        <img src={showPassword==true ? PasswordIcon : croosedEyeIcon} alt="showPassword" className='eyeIcon'  onClick={()=>{handleShowPassword()}}/>
                        
                    </CCol>
                </CRow>
                {/* <CRow>
                    <CCol xs>
                    <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>User Role</CFormLabel>
                    <CFormSelect 
                    name='role_id' 
                    className='user-input role-selectBox' 
                    onChange={(e)=>{onValueChange(e)}}
                    // defaultValue={state.role_id}
                    >
                         <option value="Administrator" selected={(state.role_id === 'Administrator') ? 'selected' : ''}>Administrator</option>
                         <option value="Agent" selected={(state.role_id === 'Agent') ? 'selected' : ''}>Agent</option>
                    </CFormSelect>
                    </CCol>
                </CRow> */}
                {/* <CRow>
                    <CCol xs>
                        <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>Address</CFormLabel>
                        <CFormInput 
                            id="exampleFormControlTextarea1" 
                            // rows="1"
                            name="address"
                            feedbackInvalid="Please Enter Your Address."
                            value={state.address}
                            onChange={(e) => { onValueChange(e)}}
                            className='user-input'
                            required
                        ></CFormInput>
                    </CCol>
                </CRow> */}
                <CRow className='btn-groups'>
                    <CCol xs>
                        <button className="AddUserBtn save-btn" type='submit'>Save</button>
                        <button className="AddUserBtn cancel-btn" onClick={routechange}>Cancel</button>

                        {showModal ? 
                            <div className="model-div insert-popup" ref={modalRef} onClick={closeModal}>
                                <div className="modal">
                                    <button onClick={() => setShowModal(false)} className='popup-close'>X</button> 
                                    <div className='popup-text-div'>
                                        <img src={DataUpdateGif} className='data-update-gif'/>
                                        <p>Data Successfully Updated</p>
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
export default EditUser