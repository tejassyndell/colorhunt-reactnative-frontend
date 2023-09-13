/* eslint-disable */
import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { useNavigate } from 'react-router-dom'

// routes config
import routes from '../routes'

const AppContent = () => {
  
  //Authenticate Page
  const Navigate = useNavigate();
  const auth = localStorage.getItem('roleAuth')
  // console.log(auth)
  

  useEffect(() => {
    if(auth==null)
    {
      // console.log("Redirect to login page")
      Navigate('/login')
    }
    else{
      // console.log("Loggin In")
    }
  }, [auth])
  
  return (
    <CContainer lg>
      <Suspense fallback={ <div className="d-flex justify-content-center spinner-class">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>}>
      {/* <Suspense fallback={<CSpinner color="secondary" />}> */}
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route path="/login" element={<Navigate to="Login" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
