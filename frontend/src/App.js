import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListReceiptsComponent from './components/ListReceiptsComponent';
import HeaderComponent from './components/HeaderComponent';
//import FooterComponent from './components/FooterComponent';
//import CreateReceiptComponent from './components/CreateReceiptComponent';
//import UpdateReceiptComponent from './components/UpdateReceiptComponent';
//import ViewReceiptComponent from './components/ViewReceiptComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListReceiptsComponent}></Route>
                          <Route path = "/receipts" component = {ListReceiptsComponent}></Route>
                          {/* <Route path = "/add-receipt/:id" component = {CreateReceiptComponent}></Route>
                          <Route path = "/view-receipt/:id" component = {ViewReceiptComponent}></Route> */}
                          {/* <Route path = "/update-receipt/:id" component = {UpdateReceiptComponent}></Route> */}
                    </Switch>
                </div>
              {/* <FooterComponent /> */}
        </Router>
    </div>
    
  );
}

export default App;
