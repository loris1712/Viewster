// pages/TicketDetails.js
import React, { useEffect, useState }  from 'react'
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import '../styles/CampaignDetails.css';
import { useSession } from '../sessionContext';
import { useLocation } from 'react-router-dom';

function TicketDetails() {
  const [email, setEmail] = useState("");
  const { session } = useSession();
  const email2 = session ? session.email : null;

  const location = useLocation();
  const { ticketId } = location.state || {};
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    fetch("https://viewster-backend.vercel.app/tickets/getConversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ticketId: ticketId,
       }),
    })
      .then((res) => res.json())
      .then((data) => setTicket(data[0]));
  }, [ticketId]);

  return (
    <div>
      <Navbar />
      <Sidebar />
        <div className='dashboard-component'>
          <div className=''>

            <div className='campaign-title'>{ticket.body_text}</div>
          </div>
        </div>
    </div>
  );
}

export default TicketDetails;
