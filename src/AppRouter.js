import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSession } from './sessionContext';
import { SessionProvider } from './sessionContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup2';
import Dashboard2 from './pages/Dashboard2';
import Messages from './pages/Messages';
import Build from './pages/Build';
import Loading from './pages/Loading';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import CampaignDetails from './pages/CampaignDetails';
import ConfirmedPayment from './pages/ConfirmedPayment';
import TicketDetails from './pages/TicketDetails';

function AppRouter() {
  const { session, login, logout } = useSession();
  return (
    <SessionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard2 />} />
          <Route path="/build" element={<Build />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/campaignDetails" element={<CampaignDetails />} />
          <Route path="/ticketDetails" element={<TicketDetails />} />
          <Route path="/confirmedPayment" element={<ConfirmedPayment />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default AppRouter;
