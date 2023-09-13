/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useParams } from 'react-router-dom'
import Message_alert from "../../src/views/orders/orderComponents/Message_alert"
import Success from "../assets/images/successfully-done.gif"
import { AppSidebarNav } from './AppSidebarNav'
import { getAccesstoken } from 'src/views/api/api'
// import { logoNegative } from 'src/assets/brand/logo-negative'
// import { sygnet } from 'src/assets/brand/sygnet'
import logo from 'src/assets/images/Logo.png'
import smallLogo from 'src/assets/brand/small-logo.svg'
import { cilAccountLogout } from '@coreui/icons'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import navigationUser from '../_navuser'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [hidestatus, setHideStatus] = useState(false);
  const [mulitiplestatus, setMultiplestatus] = useState({});
  const [alertStatus, setAlertStatus] = useState(false)
  const [alertText, setAlertText] = useState("Failed to fetch data");
  const [showSuccess, setShowSuccess] = useState(false)
  const [popUpmsg, SetpopUpmsg] = useState("Token has been Updated")
  //Get RoleId
  const [roleid, setroleid] = useState("")
  // console.log('roleid',roleid)
  useEffect(() => {
    const storedData = localStorage.getItem('roleId')
    if (storedData) {
      setroleid(storedData)
    }
  }, [])
  //LogOut Functionality
  const Navigate = useNavigate();
  // const logout = () => {
  //   // // localStorage.clear(roleAuth)
  //   localStorage. removeItem('roleAuth')
  //   Navigate('/login')
  //   console.log("Asdassfddddddddddddddddddddd");
  // }


  const testFunc = () => {
    console.log("clicked");
    localStorage.removeItem('roleAuth')
    Navigate('/')
  }
  const { code } = useParams();
  console.log(code);
  console.log("................");
  const connectToSage = async () => {
    await getAccesstoken().then((res) => {
      if ((res.status === 200)) {
        // alert("Token has been Updated")
        SetpopUpmsg("Token has been Updated")
        setShowSuccess(true)
        // add pop up to show token has been updated
      } else {
        console.log('There is an error please try again')
        // alert("There has been error", 'please try algain or try to Connect again')
        setAlertStatus(true)
        setAlertText("There has been error Please try algain or try to Connect again")
      }
    })
  }
  const disableAelrt = () => {
    setAlertStatus(false)
  }
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
      className='sidebar'
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <Link to='/dashboard' className='logo'><img src={logo} className='sidebar-logo sidebar-brand-full' /></Link>
        <img src={smallLogo} height={40} className='sidebar-logo sidebar-brand-narrow' />
      </CSidebarBrand>

      <CSidebarNav>

        <SimpleBar>

          {roleid == 'Administrator' ? <AppSidebarNav items={navigation} /> : <AppSidebarNav items={navigationUser} />}
          <li className={hidestatus ? "nav-group show" : "nav-group"}>


            <a className="nav-link nav-group-toggle" style={{ cursor: "pointer" }} onClick={() => { setHideStatus(!hidestatus) }}>
              {hidestatus ? <svg width="30" height="30" viewBox="0 0 30 30" className='nav-icon' fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="15" fill="black" />
                <path d="M19 11.4082C18.781 10.1729 17.7624 8.14272 15.3873 8.0113C12.5956 7.85683 11.0934 9.30187 11.6103 11.4082C12.1029 13.4154 16.0441 14.3418 17.8505 15.7314C19.3284 16.9667 19.3284 20.5694 15.3873 20.9811C12.4314 21.2899 10.3599 17.7274 11.181 16.1833" stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>
                : <svg width="30" height="30" viewBox="0 0 30 30" className='nav-icon' fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="15" r="15" fill="white" />
                  <path d="M19 11.4082C18.781 10.1729 17.7624 8.14272 15.3873 8.0113C12.5956 7.85683 11.0934 9.30187 11.6103 11.4082C12.1029 13.4154 16.0441 14.3418 17.8505 15.7314C19.3284 16.9667 19.3284 20.5694 15.3873 20.9811C12.4314 21.2899 10.3599 17.7274 11.181 16.1833" stroke="black" stroke-width="2" stroke-linecap="round" />
                </svg>}

              Sage
            </a>
            <ul class="nav-group-items display" style={{ height: "auto", display: `${hidestatus ? "block" : "none"}` }} >
              <li id='linke1' class="nav-item"><a class={!mulitiplestatus["linke1"] ? "nav-link" : "nav-link active"}
                onClick={() => {
                  setMultiplestatus(() => ({
                    ["linke1"]: true,
                    ["linke2"]: false
                  }));
                }}
                target="_blank" rel="noopener"
                href="https://id.sage.com/authorize?audience=s200ukipd/sage200&response_type=code&client_id=Ewzt9XLpuAitj2dsCP7J8WA8ueneUHzn&state=yes&scope=openid%20profile%20email%20offline_access&redirect_uri=https://highgrove.sincprojects.com/getToken"
              >

                <svg width="50" className='nav-icon' height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M43.9998 9.20078L43.2798 8.50078L48.9998 2.70078L47.5798 1.30078L41.7998 7.08078L41.0998 6.38078C40.2669 5.54146 39.2761 4.87529 38.1846 4.42069C37.093 3.96609 35.9223 3.73204 34.7398 3.73204C33.5574 3.73204 32.3866 3.96609 31.295 4.42069C30.2035 4.87529 29.2127 5.54146 28.3798 6.38078L27.2998 7.44078C26.9251 7.06828 26.4182 6.8592 25.8898 6.8592C25.3614 6.8592 24.8545 7.06828 24.4798 7.44078L21.7598 10.0008C21.5723 10.1867 21.4236 10.4079 21.322 10.6516C21.2205 10.8953 21.1682 11.1568 21.1682 11.4208C21.1682 11.6848 21.2205 11.9462 21.322 12.1899C21.4236 12.4337 21.5723 12.6549 21.7598 12.8408L37.9998 29.0208C38.3745 29.3933 38.8814 29.6024 39.4098 29.6024C39.9382 29.6024 40.4451 29.3933 40.8198 29.0208L43.4598 26.3808C43.8323 26.0061 44.0414 25.4992 44.0414 24.9708C44.0414 24.4424 43.8323 23.9355 43.4598 23.5608L42.8798 22.9808L43.9998 22.0008C44.8416 21.1611 45.5094 20.1635 45.9651 19.0653C46.4208 17.9671 46.6553 16.7898 46.6553 15.6008C46.6553 14.4118 46.4208 13.2345 45.9651 12.1363C45.5094 11.038 44.8416 10.0405 43.9998 9.20078ZM39.3998 27.6208L23.1798 11.3808L25.7998 8.76078L41.9998 24.9808L39.3998 27.6208ZM26.4798 32.3008L30.4798 28.3008L29.0598 26.8808L25.0598 30.8808L19.3998 25.2208L23.3998 21.2208L21.9998 19.8808L17.9998 23.8808L14.4998 20.3208C14.1279 19.9662 13.6337 19.7684 13.1198 19.7684C12.6059 19.7684 12.1118 19.9662 11.7398 20.3208L9.2398 22.8408C8.9025 23.2095 8.71544 23.6911 8.71544 24.1908C8.71544 24.6905 8.9025 25.1721 9.2398 25.5408L6.3798 28.3808C5.54048 29.2137 4.87432 30.2045 4.41971 31.296C3.96511 32.3876 3.73106 33.5583 3.73106 34.7408C3.73106 35.9232 3.96511 37.094 4.41971 38.1855C4.87432 39.2771 5.54048 40.2679 6.3798 41.1008L7.0798 41.8208L1.2998 47.5808L2.7198 49.0008L8.4998 43.2208L9.1998 44.0008C10.0395 44.8425 11.0371 45.5104 12.1353 45.9661C13.2335 46.4217 14.4108 46.6563 15.5998 46.6563C16.7888 46.6563 17.9661 46.4217 19.0643 45.9661C20.1625 45.5104 21.1601 44.8425 21.9998 44.0008L24.8398 41.1608C25.2073 41.4925 25.6848 41.6761 26.1798 41.6761C26.6749 41.6761 27.1523 41.4925 27.5198 41.1608L29.9998 38.5408C30.3544 38.1688 30.5522 37.6747 30.5522 37.1608C30.5522 36.6469 30.3544 36.1527 29.9998 35.7808L26.4798 32.3008ZM25.9998 39.6008L10.6598 24.2408L13.0998 21.7408L28.5398 37.1208L25.9998 39.6008Z" fill="white" />
                </svg>


                Connect to Sage</a></li>
              <li id='linke2' class="nav-item"><a class={!mulitiplestatus["linke2"] ? "nav-link" : "nav-link active"}
                onClick={() => {
                  setMultiplestatus(() => ({
                    ["linke1"]: false,
                    ["linke2"]: true
                  }));
                  connectToSage();
                }} >
                <svg width="50" className='nav-icon' height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_3883_9458)">
                    <path d="M46.7477 27.4805C45.6149 27.4805 44.5992 28.252 44.3453 29.3555C42.3531 38.2129 34.443 44.8438 24.9996 44.8438C19.7164 44.8438 14.6969 42.7246 10.9859 39.0137L15.4879 34.5117H3.08556V46.9141L7.48009 42.5098C12.1188 47.1582 18.3883 49.8047 24.9996 49.8047C36.7867 49.8047 46.6793 41.5332 49.1891 30.498C49.5406 28.9551 48.3297 27.4805 46.7477 27.4805ZM5.65392 20.6445C7.6461 11.7871 15.5563 5.15625 24.9996 5.15625C30.2828 5.15625 35.3024 7.27539 39.0133 10.9863L34.5113 15.4883H46.9137V3.08594L42.5094 7.49023C37.8805 2.8418 31.6109 0.195312 24.9996 0.195312C13.2125 0.195312 3.31993 8.45703 0.810166 19.502C0.458603 21.0449 1.66954 22.5195 3.25157 22.5195C4.39415 22.5195 5.40978 21.748 5.65392 20.6445Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_3883_9458">
                      <rect width="50" height="50" fill="white" />
                    </clipPath>
                  </defs>
                </svg>


                Refresh your token</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link" style={{ cursor: "pointer" }} onClick={() => { testFunc() }}>
              <CIcon icon={cilAccountLogout} customClassName="nav-icon" />
              Log out
            </a>
          </li>

        </SimpleBar>
      </CSidebarNav >
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
    </CSidebar >
  )
}

export default React.memo(AppSidebar)
