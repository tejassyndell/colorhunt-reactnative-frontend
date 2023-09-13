/* eslint-disable */
import React, { Component, Suspense, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DataProvider } from './ContextData/DataContext'
import './scss/style.scss'
import './css/main.css'





// import './css/s-dev2.css'
// import ResetPassword from './views/pages/login/ResetPassword'
// import ForgotPass from './views/pages/login/ForgotPass'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const ForgotPassword = React.lazy(() => import('./views/pages/login/Forgotpassword'))
const ResetPassword = React.lazy(() => import('./views/pages/login/ResetPassword'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const Users = React.lazy(() => import('./views/users/allusers'))



function App(){
  // const Navigate = useNavigate();
  const [ roleAuth, setroleAuth ] = useState()

  useEffect(()=>{
      const auth = localStorage.getItem("roleAuth")
      setroleAuth(auth)
  },[])

  // if(!auth){
  //   console.log("Non-Auth")
  //   Navigate('/login')
  // }
  // else{
  //   console.log("Auth")
  // }

  return(
    <BrowserRouter>
    <Suspense>
    <DataProvider>
      <Routes>
        {/* <Route exact path="/*" name="Login Page" element={<Login />} /> */}
        <Route exact path="/" name="Login Page" element={<Login />} />
        <Route exact path="/forgotpassword" name="Forgot Password Page" element={<ForgotPassword />} />
        <Route exact path="/resetpassword" name="Forgot Password Page" element={<ResetPassword />} />
        {roleAuth === 'user' ? (
          <>
            <Route path="/*" name="Home" element={<DefaultLayout />} />

          </>
        ) : (
          <>
            <Route exact path="/*" name="Login Page" element={<Login />} />
          </>
        )}
      </Routes>
      </DataProvider>
    </Suspense>
  </BrowserRouter>


    // <BrowserRouter>
    //   <Suspense fallback={loading}>
    //     <Routes>
    //     
    //       <Route exact path="/register" name="Register Page" element={<Register />} />
    //       <Route exact path="/404" name="Page 404" element={<Page404 />} />
    //       <Route exact path="/500" name="Page 500" element={<Page500 />} />

    //       <Route path="/dashboard/test" name="Home" element={<ForgotPassword />} />
          
    //     </Routes>
    //   </Suspense>
    // </BrowserRouter>



  )
}



// class App extends Component {
//   render() {
//     return (
//       <HashRouter>
//         <Suspense fallback={loading}>
//           <Routes>
//             <Route exact path="/login" name="Login Page" element={<Login />} />
//             <Route exact path="/register" name="Register Page" element={<Register />} />
//             <Route exact path="/404" name="Page 404" element={<Page404 />} />
//             <Route exact path="/500" name="Page 500" element={<Page500 />} />
//             <Route path="*" name="Home" element={<DefaultLayout />} />
//           </Routes>
//         </Suspense>
//       </HashRouter>
//     )
//   }
// }

export default App
