/* eslint-disable */
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
// import ProfileIcon from 'src/assets/images/cart.png'
import CartIcon from 'src/assets/images/cart.png'
import MobileLogo from 'src/assets/images/LogoImg.png'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          // className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <AppBreadcrumb />
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
          <img src={MobileLogo} width={250} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
        </CHeaderNav>
        <CHeaderNav >
          <CNavItem>
            {/* <CNavLink href="/cart"> */}
              <Link to={"/cart"}>
              <img src={CartIcon} height={30}/>
              </Link>
            {/* </CNavLink> */}
          </CNavItem>
        {/* </CHeaderNav>
        <CHeaderNav className="ms-3"> */}
        <CNavItem>
          <AppHeaderDropdown />
        </CNavItem> 
        </CHeaderNav>
      </CContainer>
      {/* <CHeaderDivider /> */}
      {/* <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader
