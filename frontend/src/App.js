import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ListReceiptsComponent from './components/ListReceiptsComponent.jsx';
import HeaderComponent from './components/HeaderComponent';
import Homepage from './Homepage'
import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import Profile from './Profile'
import ImageUpload from './ImageUpload'
import EditProfile from './EditProfile.js';
import SearchWorkshops from './SearchWorkshops'
import AdminLogin from './AdminLogin'
import AdminHomepage from './AdminHomepage'
import CreateWorkshop from './CreateWorkshop.js';
import ShowWorkshop from './ShowWorkshop.js';
import WorkshopDetails from './WorkshopDetails.js';
import OrganizedWorkshops from './OrganizedWorkshops.js';
import EditWorkshop from './EditWorkshop.js';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/receipts" Component={ListReceiptsComponent}></Route>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/homepage' element={<Homepage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/forgotpassword' element={<ForgotPassword />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/editprofile' element={<EditProfile />}></Route>
          <Route path='/imageupload' element={<ImageUpload />}></Route>
          <Route path='/createworkshop' element={<CreateWorkshop />}></Route>
          <Route path="/SearchWorkshops" element={<SearchWorkshops />} />
          <Route path='/adminlogin' element={<AdminLogin />}></Route>
          <Route path='/adminhomepage' element={<AdminHomepage />}></Route>
          <Route path='/showworkshops' element={<ShowWorkshop />}></Route>
          <Route path='/workshopdetails' element={<WorkshopDetails />}></Route>
          <Route path='/organizedworkshops' element={<OrganizedWorkshops />}></Route>
          <Route path='/editworkshop' element={<EditWorkshop />}></Route>

        </Routes>
      </Router>
    </div>
  )

}
export default App