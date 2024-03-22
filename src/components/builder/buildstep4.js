import React, { useState } from 'react';
import '../../styles/BuildStep.css';
import Select from 'react-select';
import { useNavigate, useLocation } from 'react-router-dom';

function BuildStep4({ step }) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/dashboard');
  };

  return (
    <div className='buildstep-container'>
      <div className='laststep-container'>
        <h2>{step}</h2>
        <p>Your order has been processed. Our team will review the ad and begin the campaign within 2 business days. You will receive a notification when the campaign has started and reports will be updated daily on Views and Budgets in "All Campaigns".</p>
        <p>Once the campaign is set up and approved by Google/YouTube, we will charge your card.</p>
        <p>Rest assured, if the campaign is stopped for any reason or cannot be served, you will only be billed for the delivered views and the remaining amount will be refunded to you.</p>
        <button className="btn btn-primary button-next-builder" onClick={handleSubmit}>Home</button>
      </div>
    </div>
  );
}

export default BuildStep4;
