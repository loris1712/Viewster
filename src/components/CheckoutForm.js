import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import '../styles/BuildStep.css';
import { useSession } from '../sessionContext';

export default function CheckoutForm({email, data, paymentIntentId, budget}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [email2, setEmail2] = useState(email);

  const { session } = useSession();
 
  const [userId, setUserId] = useState('');

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
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

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
      //.then((data) => setClientSecret(data.clientSecret));

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://viewster.vercel.app/confirmedPayment",
        receipt_email: email2,
      },
    });

    

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
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
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button className="btn btn-primary button-next-builder" style={{marginTop: '1.5rem', marginBottom: "1.5rem"}} disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? "Loading" : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}