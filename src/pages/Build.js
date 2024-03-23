// pages/Dashboard.js
import React, { useEffect, useState }  from 'react'
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import '../styles/Build.css';
import { useSession } from '../sessionContext';
import { useLocation } from 'react-router-dom';
import BuildStep0 from '../components/builder/buildstep0';
import BuildStep1 from '../components/builder/buildstep1';
import BuildStep2 from '../components/builder/buildstep2';
import BuildStep3 from '../components/builder/buildstep3';
import BuildStep4 from '../components/builder/buildstep4';
import AuthGuard from './api/authGuard';

const steps = [
  'Setup a new campaign',
  'Campaign Information',
  'Pay and Begin',
  'Thank you for submitting!',
];

function Build() {
  const [email, setEmail] = useState("");
  const { session } = useSession();
  const email2 = session ? session.email : null;
  const [currentStep, setCurrentStep] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [campaignData, setCampaignData] = useState({
    // Struttura iniziale dei dati della campagna
  });

  const updateCampaignData = (newData) => {
    setCampaignData({ ...campaignData, ...newData });
  };


  const startCampaignBuilder = () => {
    setIsStarted(true);
  };

  const closeCampaignBuilder = () => {
    setIsStarted(false);
  };

    const nextStep = () => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        //console.log(campaignData);
      }
    };
  
    const prevStep = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    };
  
    const renderStepContent = (step) => {
      switch (step) {
        case 0:
          return <BuildStep1 data={campaignData} updateData={updateCampaignData} step={steps[0]} onNext={nextStep} currentStep={currentStep} steps={steps} prevStep={prevStep} closeCampaignBuilder={closeCampaignBuilder} />;
        case 1:
          return <BuildStep2 data={campaignData} updateData={updateCampaignData} step={steps[1]} onNext={nextStep} currentStep={currentStep} steps={steps} prevStep={prevStep} closeCampaignBuilder={closeCampaignBuilder} />;
        case 2:
          return <BuildStep3 data={campaignData} updateData={updateCampaignData} step={steps[2]} onNext={nextStep} currentStep={currentStep} steps={steps} prevStep={prevStep} closeCampaignBuilder={closeCampaignBuilder} />;
        case 3:
          return <BuildStep4 data={campaignData} updateData={updateCampaignData} step={steps[3]} onNext={nextStep} currentStep={currentStep} steps={steps} prevStep={prevStep} closeCampaignBuilder={closeCampaignBuilder} />;
        default:
          return <div>Step non trovato</div>;
      }
    };

    const calculateProgress = () => {
      return ((currentStep + 1) / steps.length) * 100;
    };

  return (
    <div>
      
      <AuthGuard>
      <Navbar />
      <Sidebar />
        <div className='dashboard-component'>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${calculateProgress()}%` }}></div>
          </div>

        
          {!isStarted ? (
            <div>
              <BuildStep0></BuildStep0>
              <button className="btn btn-primary button-start-campaign" type="submit" onClick={startCampaignBuilder}>Build Your Campaign</button>
            </div>
          ) : (
            <>
              <div className="step-content">
                {renderStepContent(currentStep)}
              </div>
            </>
          )}
          
        </div>
        </AuthGuard>
    </div>
  );
}

export default Build;
