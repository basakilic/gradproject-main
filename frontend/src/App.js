import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route,Switch } from 'react-router-dom'
import Homepage from './homepage'
import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import Profile from './Profile'
import EditProfile from './EditProfile'
import ListReceiptsComponent from './components/ListReceiptsComponent';
import HeaderComponent from './components/HeaderComponent';
//import FooterComponent from './components/FooterComponent';
//import CreateReceiptComponent from './components/CreateReceiptComponent';
//import UpdateReceiptComponent from './components/UpdateReceiptComponent';
//import ViewReceiptComponent from './components/ViewReceiptComponent';

function App() {
  return (
    <div>
        <Routes>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListReceiptsComponent}></Route>
                          <Route path = "/receipts" component = {ListReceiptsComponent}></Route>
                          {/* <Route path = "/add-receipt/:id" component = {CreateReceiptComponent}></Route>
                          <Route path = "/view-receipt/:id" component = {ViewReceiptComponent}></Route> */}
                          {/* <Route path = "/update-receipt/:id" component = {UpdateReceiptComponent}></Route> */}
                          <Route path='/' element={<Homepage />}></Route>
                          <Route path='/homepage' element={<Homepage />}></Route>
                          <Route path='/login' element={<Login />}></Route>
                          <Route path='/signup' element={<Signup />}></Route>
                          <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
                          <Route path='/profile' element={<Profile />}></Route>
                          <Route path='/editprofile' element={<Profile />}></Route>
                    </Switch>
                </div>
              {/* <FooterComponent /> */}
        </Routes>
    </div>
    
  );
}
export default App