import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import '../styles/BuildStep.css';
import { useSession } from '../sessionContext';
import { useNavigate } from 'react-router-dom';

export default function CheckoutForm({email, data, paymentIntentId, budget, onClick}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [email2, setEmail2] = useState(email);

  const { session } = useSession();
 
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
      const sessionEmail = session ? session.email : null;
      fetch("https://viewster-backend.vercel.app/users/getUserId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: sessionEmail,
         }),
      })
        .then((res) => res.json())
        .then((data) => setUserId(data[0].id));
    }, [session]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!stripe || !elements) {
      console.error("Stripe is not inizialized.");
      return;
    }
  
    setIsLoading(true);
      //.then((data) => setClientSecret(data.clientSecret));
  
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          //return_url: "https://viewster.vercel.app/confirmedPayment",
          receipt_email: email2,
        },
      });
  
      if (error) {
        console.error("An unexpected error occurred:", error.message);
        setIsLoading(false);
      } else {
        fetch("https://viewster-backend.vercel.app/campaigns/saveCampaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          data: data,
          paymentIntentId: paymentIntentId,
          campaignStatus: 'Pending Start',
          ownerId: userId,
         }),
      })
        .then((res) => res.json())
        .then((responseData) => {
          navigate('/confirmedPayment');
          window.location.reload();
        })
      }
    } catch (error) {
      console.error("Error during the payment process:", error);
      setIsLoading(false);
    }
  };
  
  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit} style={{marginTop: '2rem'}}>
        <input
            id="email"
            type="text"
            value={email2}
            onChange={(e) => setEmail2(e.target.value)}
            className="form-control input-field-text"
            placeholder="Enter email address"
        />

        <div>
          <h3 className="div-total-amount">Total Amount: <span className="total-amount">${budget}</span></h3>
        </div>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <div className="paynow-notes">
        <p>* When you click "Pay Now", we will pre-authorize your card for the payment. </p>
        <p>* Once the campaign is set up and approved by Google/YouTube, we will charge your card.</p>
        <p>* Rest assured, if the campaign is stopped for any reason or cannot be served, you will only be billed for the delivered views and the remaining amount will be refunded to you.</p>
      </div>
      
      <div className="buttons-control-checkout">
        <button className="btn btn-primary button-next-builder" disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? "Loading" : "Pay now"}
          </span>
        </button>
        <button className="button-back-builder button-back-step-3" onClick={onClick}>Back</button>
      </div>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}