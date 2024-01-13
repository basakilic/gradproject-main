import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './homepage'
import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import Profile from './Profile'
import ReceiptDetails from './ReceiptDetails'
import ImageUpload from './ImageUpload'

const mongo_uri= 'mongodb+srv://basak:basakgradproject@cluster0.g7mhazp.mongodb.net/'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/homepage' element={<Homepage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/editprofile' element={<Profile />}></Route>
        <Route path='/receiptdetails' element={<ReceiptDetails />}></Route>
        <Route path='/imageupload' element={<ImageUpload />}></Route>

      </Routes>
    </BrowserRouter>)
}
export default App