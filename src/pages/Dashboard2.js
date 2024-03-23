// pages/Dashboard.js
import React, { useEffect, useState }  from 'react'
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import '../styles/Dashboard.css';
import { useSession } from '../sessionContext';
import { useNavigate } from 'react-router-dom';
import AuthGuard from './api/authGuard';

function Dashboard2() {
  const [email, setEmail] = useState("");
  const { session } = useSession();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = campaigns.filter(campaign => 
      campaign.Title.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredCampaigns(filtered);
  }, [searchQuery, campaigns]);

  useEffect(() => {
    function reveal() {
      var reveals = document.querySelectorAll(".transition");

      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }

    window.addEventListener("scroll", reveal);
  }, []);

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
    fetch("https://viewster-backend.vercel.app/campaigns/getMyCampaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ownerId: userId,
       }),
    })
      .then((res) => res.json())
      .then((data) => setCampaigns(data));
  }, [userId]);

  const handleCampaignDetail = (campaignId) => {
    navigate('/campaignDetails', { state: { campaignId } });
  };

  return (
    <div>
      <AuthGuard>
      <Navbar />
      <Sidebar />
        <div className='dashboard-component'>
          <input type="email" className="form-control searchbar" id="email" placeholder="Search a campaign" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          <div className='table-campaigns'>
          <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">Campaign Name</th>
      <th scope="col">Type</th>
      <th scope="col" className='desktop'>Starting Date</th>
      <th scope="col" className='desktop'>End Date</th>
      <th scope="col">Status</th>
      <th scope="col"></th>
    </tr>
  </thead>

  <tbody>
    {filteredCampaigns.length > 0 ? (
      filteredCampaigns.map((campaign, index) => (
        <tr key={index} className='campaign-row' onClick={() => handleCampaignDetail(campaign.Campaign_id)}>
          <th scope="row">{campaign.Title}</th>
          <td>{campaign.Type}</td>
          <td className='desktop'>
            {new Date(campaign.StartDate).toLocaleDateString('en-US', {
              month: '2-digit', 
              day: '2-digit', 
              year: 'numeric'
            })}
          </td>

          <td className='desktop'>
            {new Date(campaign.EndDate).toLocaleDateString('en-US', {
              month: '2-digit', 
              day: '2-digit', 
              year: 'numeric'
            })}
          </td>

          <td>
            <div 
              className={`btn ${
                campaign.Status === 'Pending Start' 
                  ? 'button-status-pending' 
                  : campaign.Status === 'Started' 
                    ? 'button-status-started' 
                    : campaign.Status === 'Completed' 
                      ? 'button-status-completed'
                      : ''
              }`}>
              {campaign.Status}
            </div>
          </td>
          <td className='row-last'>
            <div className='navbar-icon btn-campaign-detail'>
              <svg xmlns="http://www.w3.org/2000/svg" height="18px" fill="#fff" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" className="text-center">There are no campaigns created.</td>
      </tr>
    )}
  </tbody>
</table>

          </div>
        </div>
        </AuthGuard>
    </div>
  );
}

export default Dashboard2;