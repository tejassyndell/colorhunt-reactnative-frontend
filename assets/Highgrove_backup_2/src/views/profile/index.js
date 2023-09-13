/* eslint-disable */
import React,{useState,useEffect,useRef} from 'react'
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
import { UserProfile,UpdateProfile } from '../../views/api/api';
import DataUpdateGif from 'src/assets/images/successfully-done.gif'
import croosedEyeIcon from 'src/assets/images/eye-crossed-edit.svg'
import PasswordIcon from 'src/assets/images/eye.svg'
// const url = 'http://localhost:8090'
// const url = 'https://highgrove-backend.sincprojects.com'
const url = 'https://highgrove-final-backend.sincprojects.com'
// const url = 'https://highgrove-milestone-2.sincprojects.com'

const Profile = () => {

    //Get RoleId from LocalStorage
    const userId = localStorage.getItem('userId')
    
    //Form data
    const [validated, setValidated] = useState(false)
    const [showModal, setShowModal] = useState(false);
    
    const intialValues = {
      username: '',
      first_name: '',
      last_name: '',
      // role_id,
      email: '',
      password: '',
    }
    const [showPassword,setshowPassword]=useState(false)
    const handleShowPassword = () => {
      setshowPassword((current) => !current);
  };
    const [state, SetState] = useState(intialValues)
    console.log('state',state)

    const navigate = useNavigate()
    const onValueChange = (e) => {
      SetState({ ...state, [e.target.name]: e.target.value })
     console.log(state.password)
    }


    // const [profiledata, setprofiledata] = useState([])
    // console.log('profiledata',profiledata)
    const loadprofileData = async() =>{
      const result = await UserProfile(userId)
      // setprofiledata(result.data)
      SetState({ ...result.data })
    }
    useEffect(()=>{
      // UserProfile(userId)
      loadprofileData(userId)
    },[userId])

    const onClickUpdate = async(event)=>{
      const form = event.currentTarget
      if (form.checkValidity() === true){
        setValidated(true)
        event.preventDefault()
        const result = await UpdateProfile(state)
        console.log("resultresultresult",result)
        setShowModal(true);
      }
      

      event.preventDefault()
      event.stopPropagation()
      // const response = await UpdateProfile(state)
      // console.log('response',response.data)
      setValidated(true);
      // setShowModal(true);
    }
     const openModal = () => {
        setShowModal(true);
    };
    const routeChange = () =>{ 
      navigate('/dashboard')
    } 
    //****************popup start*********************//
    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
        // setShowModal(false);
        navigate('/all-users')
        }
    };
    const routechange = ()=>{
      navigate('/dashboard')
    }

    console.log(state.password);
    const isPasswordValid = state.password.pattern ===' (?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}';
    const isPasswordEmpty = state.password.length === 0;
    // const isEmailValid = state.email.pattern ='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}';
    // const isEMailEmpty = state.email.length === 0;

      const isEmailValid = state.email.pattern ==='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}';
      const isEMailEmpty = state.email.length === 0;
  
      const isFirstName = state.first_name.length === 0;
      const isFirstNameValid = state.first_name.pattern === "^[A-Za-z]{3,16}";

      const isLastName = state.last_name.length === 0;
      const isLastNameValid = state.last_name.pattern === "^[A-Za-z]{3,16}";

   
    // console.log(isEmailValid, "valid");
    // console.log(state.email[0].length, "empty");


    return(
      <div className='editform-div'><br/><br/>
        <CForm className="row g-3 needs-validation text-start editform" noValidate validated={validated} onSubmit={onClickUpdate}>
          <CRow>
            <CCol xs>
              <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>First Name</CFormLabel>
              <CFormInput 
                // feedbackInvalid="Please Enter Your First Name."
                feedbackInvalid={
                  isFirstName
                  ? 'Please enter first name'
                  : isFirstNameValid
                  ? null
                  : 'Please enter valid first name'
                }
                aria-label="First name" 
                name="first_name"
                value={state.first_name}
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
                  ? 'Please enter last name'
                  : isLastNameValid
                  ? null
                  : 'Please enter valid last name'
                }
                name="last_name"
                value={state.last_name}
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
                  feedbackInvalid="Please enter your user name."
                  name="username"
                  value={state.username}
                  onChange={(e)=>{onValueChange(e)}}
                  className='user-input'
                  pattern="^[A-Za-z0-9]{3,16}" required
                />
                </CCol>
            </CRow>
            <CRow>
              <CCol xs>
                <CFormLabel htmlFor="exampleFormControlInput1" className='form-label'>Email</CFormLabel>
                <CFormInput 
                  type="email"
                  aria-label="Email" 
                  name="email"
                  feedbackInvalid={
                    isEMailEmpty
                    ? 'Please enter email'
                    : isEmailValid
                    ? null
                    :"Please enter valid email"
                    
                  }
                  value={state.email}
                  // pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}"
                  onChange={(e)=>{onValueChange(e)}}
                  className='user-input'
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}"
                  id="validationCustom03" required
                />
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
                <CRow>
                   <CCol xs  className='add_user_pass'>
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
                <CRow className='btn-groups'>
                <CCol xs>
                    <button className="AddUserBtn save-btn" type='submit'>Update</button>
                    <button className="AddUserBtn cancel-btn" onClick={routeChange}>Cancel</button>

                        {showModal ? 
                            <div className="model-div insert-popup" ref={modalRef} onClick={closeModal}>
                                <div className="modal">
                                    <button onClick={() => setShowModal(false)} className='popup-close'>X</button> 
                                    <div className='popup-text-div'>
                                        <img src={DataUpdateGif} className='data-update-gif'/>
                                        <p className='mb-4'>Data Successfully Updated</p>
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

export default Profile