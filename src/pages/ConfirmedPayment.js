// pages/Dashboard.js
import React, { useEffect, useState }  from 'react'
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import '../styles/CampaignDetails.css';
import { useSession } from '../sessionContext';
import { useLocation } from 'react-router-dom';
import BuildStep4 from '../components/builder/buildstep4';
import AuthGuard from './api/authGuard';

function ConfirmedPayment() {
  const { session } = useSession();
  const email2 = session ? session.email : null;

  const location = useLocation();
  const { details } = location.state || {};

  return (
    <div>
      <AuthGuard>
      <Navbar />
      <Sidebar />
        <div className='dashboard-component'>
          <BuildStep4 step="Thank you for submitting!" />
        </div>
        </AuthGuard>
    </div>
  );
}

export default ConfirmedPayment;
