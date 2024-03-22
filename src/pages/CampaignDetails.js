// pages/CampaignDetails.js
import React, { useEffect, useState }  from 'react'
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import '../styles/CampaignDetails.css';
import { useSession } from '../sessionContext';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import YouTubeEmbed from '../components/YouTubeEmbed';

function CampaignDetails() {
  const { session } = useSession();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const { campaignId } = location.state || {};
  const [campaign, setCampaign] = useState([]);
  const [sentenceDaysLeft, setSentenceDaysLeft] = useState('');
  const [calculatedSpentBudget, setCalculatedSpentBudget] = useState('');
  let id = searchParams.get("id")

  const calculateProgress = (BudgetSpent, Budget) => {
    if (Budget === 0) {
      return 0;
    }
  
    return (BudgetSpent / Budget) * 100;
  };
  

  useEffect(() => {
    fetch("https://viewster-backend.vercel.app/campaigns/getCampaign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        campaign_id: campaignId ? campaignId : id,
       }),
    })
      .then((res) => res.json())
      .then((data) => setCampaign(data[0]));
  }, [campaignId]);

  useEffect(() => {
    const startDt = new Date(campaign.StartDate);
    const endDt = new Date(campaign.EndDate);
    const now = new Date();

    const totalDuration = Math.ceil((endDt - startDt) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.ceil((now - startDt) / (1000 * 60 * 60 * 24));
    
    const daysLeft = totalDuration - daysElapsed;
    const dayWord = daysLeft === 1 ? 'day' : 'days';
    const dayWord2 = totalDuration === 1 ? 'day' : 'days';

    setSentenceDaysLeft(totalDuration + ' ' + dayWord2);

    let costPerView;
    if (campaign.Area === 'Global') {
      costPerView = campaign.Budget > 1000 ? 0.006 : 0.0065;
    } else if (campaign.Area === 'US') {
      costPerView = 0.018;
    }
    let currentViews = parseFloat(campaign.CurrentTotalViews * costPerView).toLocaleString('en-US');
    setCalculatedSpentBudget(currentViews);
    //console.log(calculatedSpentBudget)

  }, [campaign]);

  const handleMessages = (ticketId) => {
    navigate('/messages?id='+ticketId);
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
        <div className='dashboard-component'>
          <div className=''>

            <div className='campaign-title'>{campaign.Title}</div>
            <div className='campaign-status'>
              <h3>Status</h3>

              <div 
                        className={`btn button-status ${
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

              <div className="btn btn-primary button-next-builder" onClick={() => handleMessages(campaign.Ticket_id)}>Messages</div>
            </div>

            <div className='row align-items-start first-section campaign-panel'>
              <div className='col'>
                <div className='data-panel'>
                  <div className='data-panel-title'>
                    Total Views
                  </div>
                  <div className='data-panel-info'>
                    {campaign.NumberViews}
                  </div>
                </div>
              </div>
              <div className='col'>
                <div className='data-panel'>
                  <div className='data-panel-title'>
                    Time
                  </div>
                  <div className='data-panel-info'>
                    {sentenceDaysLeft}
                  </div>
                </div>
              </div>
              <div className='col'>
                <div className='data-panel'>
                  <div className='data-panel-title'>
                    Spent
                  </div>
                  <div className='data-panel-info'>
                    ${campaign.BudgetSpent} out of ${campaign.Budget}
                  </div>
                </div>
              </div>
            </div>

            <div className='row  align-items-start first-section campaign-panel campaign-panel-information'>
              <h3>Information</h3>
              <div className='col'>
                <div className='row align-items-start campaign-information'>
                  <div className='col'>
                    <div className='information-title'>
                      Start date
                    </div>
                    <div className='information-description'>
                      {new Date(campaign.StartDate).toLocaleDateString('en-US', {
                      month: '2-digit', 
                      day: '2-digit', 
                      year: 'numeric'
                    })}
                    </div>
                  </div>
                  <div className='col'>
                    <div className='information-title'>
                      End date
                    </div>
                    <div className='information-description'>
                      {new Date(campaign.EndDate).toLocaleDateString('en-US', {
                      month: '2-digit', 
                      day: '2-digit', 
                      year: 'numeric'
                    })}
                    </div>
                  </div>
                  <div className='col'>
                    <div className='information-title'>
                      Days
                    </div>
                    <div className='information-description'>
                      {campaign.Days}
                    </div>
                  </div>
                  <div className='col'>
                    <div className='information-title'>
                      Type
                    </div>
                    <div className='information-description'>
                      {campaign.Type}
                    </div>
                  </div>
                </div>

                <div className='progress-bar-container'>
                  <div className='counter-container'>
                    <div className='counter'>
                      {campaign.CurrentTotalViews}
                    </div>
                    <div className='counter total-counter'>
                      {campaign.NumberViews}
                    </div>
                  </div>

                  {campaign.BudgetSpent && campaign.Budget && calculatedSpentBudget &&
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${calculateProgress(calculatedSpentBudget, campaign.Budget)}%` }}></div>
                    </div>
                  }

                  <div className='counter-container'>
                    <div className='counter'>
                      $ {calculatedSpentBudget}
                    </div>
                    <div className='counter total-counter'>
                      $ {campaign.Budget}
                    </div>
                  </div>
                </div>

                <div className='row align-items-start campaign-information'>
                  <h3>The video has</h3>
                  <div className='row align-items-start campaign-attributes'>
                  {campaign.SelectedOptions && Array.isArray(JSON.parse(campaign.SelectedOptions)) && JSON.parse(campaign.SelectedOptions).map((attribute, index) => (
                    <div className='campaign-attribute' key={index}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" fill="#00C2EC" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                      <div className='attribute-name'>{attribute}</div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
              <div className='col'>
                <h3>YouTube Video</h3>
                {campaign.VideoLink &&
                  <YouTubeEmbed videoLink={campaign.VideoLink}></YouTubeEmbed>
                }

                <h3>YouTube Video Link</h3>
                <a href={campaign.VideoLink} className="campaign-link">{campaign.VideoLink}</a>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default CampaignDetails;
