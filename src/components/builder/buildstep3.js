import React, { useState, useEffect } from 'react';
import '../../styles/BuildStep.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSession } from '../../sessionContext';
import CheckoutForm from "../CheckoutForm";

//const stripePromise = loadStripe('pk_live_51OZ4XcJT0IkqABPGOksLIGBT7STL4BN0kkkOeTrUZQKITJhOCbPx1dh9YZbpYuXY3db2pGY2Xi3LNVHI7qmZStjl00VKtlTjvQ');
const stripePromise = loadStripe('pk_test_51OZ4XcJT0IkqABPGLxGzuEBlmLp2dN67p5DfkznguEdEBIrGvT8ZoXZT3Aj8UAFoWi6JcKanAecV2C3ljtdrjX7K005TmCS6jj')

function BuildStep4({ data, updateData, step, onNext, currentStep, steps, closeCampaignBuilder, prevStep, nextStep }) {
  const [title, setTitle] = useState(data.title || '');
  const [videoLink, setVideoLink] = useState(data.videoLink || '');
  const [startDate, setStartDate] = useState(data.startDate || '');
  const [endDate, setEndDate] = useState(data.endDate || '');
  const [days, setDays] = useState(data.days || '');
  const [type, setType] = useState(data.type || '');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [viewsType, setViewsType] = useState(data.viewsType || '');
  const [area, setArea] = useState(data.area || 'Global');
  const [priceBy, setPriceBy] = useState(data.priceBy || '');
  const [numberViews, setNumberViews] = useState(data.numberViews || '');
  const [budget, setBudget] = useState(parseFloat(data.budget) || '');
  const [views, setViews] = useState(0);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');

  const { session } = useSession();
  const email = session ? session.email : null;

  const handleSubmit = async () => {
    //updateData({ title, videoLink, startDate, endDate, days, radioOption });
    console.log("Pagamento riuscito");
    //onNext(); 
  };

  useEffect(() => {
    
  console.log(data)
  
    fetch("https://viewster-backend.vercel.app/payments/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        amount: budget*100 ,
        //receiptEmail: email,  // Email del cliente
        description: 'Created Campaign'
       }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
    })
  }, []);

  const appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#0d6efd',
      colorBackground: '#2d2d2d',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className='buildstep-container'>
      <h2>{step}</h2>

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm data={data} budget={data.budget} email={email} paymentIntentId={paymentIntentId} />
        </Elements>
      )}

        <div className='builder-controls'>
              {currentStep === 0 ? (
                <button className="button-back-builder" type="submit" onClick={closeCampaignBuilder}>Back</button>
              ) : (
                <button className="button-back-builder" onClick={prevStep}>Back</button>
              )}
              </div>
    </div>
  );
}

export default BuildStep4;