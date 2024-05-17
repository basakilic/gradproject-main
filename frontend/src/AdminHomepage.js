import React from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';

function AdminHomepage() {
  return (
    <div>
      <AdminHeader />
      <h3>WELCOME</h3>
      <p>You can start to manage instructor requests</p>
    </div>
  );
}

export default AdminHomepage;
