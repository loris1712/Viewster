// pages/CampaignDetails.js
import React, { useEffect, useState }  from 'react'
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import '../styles/CampaignDetails.css';
import { useSession } from '../sessionContext';
import { useLocation } from 'react-router-dom';
import YouTubeEmbed from '../components/YouTubeEmbed';

function CampaignDetails() {
  const [email, setEmail] = useState("");
  const { session } = useSession();
  const email2 = session ? session.email : null;

  const location = useLocation();
  const { campaignId } = location.state || {};
  const [campaign, setCampaign] = useState([]);
  const [sentenceDaysLeft, setSentenceDaysLeft] = useState('');

  const calculateProgress = (BudgetSpent, Budget) => {
    if (Budget === 0) {
      // Handle the case where the total budget is 0 to avoid division by zero
      return 0;
    }
  
    // Calculate the percentage of the budget spent
    return (BudgetSpent / Budget) * 100;
  };
  

  useEffect(() => {
    fetch("https://viewster-backend.vercel.app/campaigns/getCampaign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        campaign_id: campaignId,
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

    setSentenceDaysLeft(daysLeft + ' '  + dayWord + ' left of ' + totalDuration + ' ' + dayWord2)

  }, [campaign]);

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
              {/*<div className="btn btn-primary button-next-builder">Stop campaign</div>*/}
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

                  {campaign.BudgetSpent && campaign.Budget &&
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${calculateProgress(campaign.BudgetSpent, campaign.Budget)}%` }}></div>
                    </div>
                  }

                  <div className='counter-container'>
                    <div className='counter'>
                      $ {campaign.BudgetSpent}
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
                      <div className='attribute-name'>{attribute.value}</div>
                    </div>
                  ))}
                    <div className='campaign-attribute'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" fill="#00C2EC" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                      <div className='attribute-name'>Drugs</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col'>
                <h3>YouTube Video</h3>
                {campaign.VideoLink &&
                  <YouTubeEmbed videoLink={campaign.VideoLink}></YouTubeEmbed>
                }

                <h3>YouTube Video Link</h3>
                <a href={campaign.VideoLink}>{campaign.VideoLink}</a>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default CampaignDetails;