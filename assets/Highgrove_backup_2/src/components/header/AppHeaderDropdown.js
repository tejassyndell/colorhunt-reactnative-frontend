/* eslint-disable */
import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavItem,
  CNavLink
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import ProfileIcon from 'src/assets/images/Profile.png'
import CartIcon from 'src/assets/images/cart.png'
import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const navigate = useNavigate();
  const logout = () =>{
    // localStorage.clear(roleAuth)
    localStorage. removeItem('roleAuth')
    navigate('/')
  }
  return (
    <CDropdown variant="nav-item">
      {/* <CNavItem>
        <CNavLink href="#">
          <img src={CartIcon} height={30}/>
        </CNavLink>
      </CNavItem> */}
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {/* <CAvatar src={avatar8} size="md" /> */}
        <img src={ProfileIcon} height={30}/>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2 profile-popup">X</CDropdownHeader>
        <CDropdownItem href="/profile" className='my-profile-dropdown'>
          <img src={ProfileIcon} height={30}/> &nbsp;&nbsp;My Profile
        </CDropdownItem>
        <CDropdownItem href="/login" onClick={logout} className=''>
          <CIcon icon={cilAccountLogout} className="me-2" height={30}/>&nbsp;Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown