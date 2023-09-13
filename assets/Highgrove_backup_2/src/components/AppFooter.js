/* eslint-disable */
import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      {/* <div>
        <a href="#" target="_blank" rel="noopener noreferrer">
          HighGrove
        </a>
        <span className="ms-1">&copy; Beds UK, All Rights Reserved</span>
      </div> */}
      <div className="ms-auto">
        <span className="me-1" style={{fontWeight : "bold"}}>© HighGrove Beds UK, All Rights Reserved.</span>
        {/* <a href="#" target="_blank" rel="noopener noreferrer">
          HighGrove© Beds UK, All Rights Reserved
        </a> */}
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
