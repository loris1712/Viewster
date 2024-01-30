import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/BuildStep.css';
import { useSession } from '../../sessionContext';
import Sidebar from '../sidebar';
import { NavLink } from 'react-router-dom';

const Buildstep0 = () => {

  return (
    <div className="buildstep">
      <div className='buildstep1'>
        <h2>
          Start a new campaign
        </h2>
        <p>
          Quickly set up and manage your Viewster Campaign with these easy steps.
        </p>

        <div className='buildstep1_paragraph'>
          <h3>
            Our Guarantee:
          </h3>
          <ul>
            <li>
              You will only be charged for the views that your video receives.
            </li>
            <li>
              Any unserved views will be refunded back to you at the end of the campaign.
            </li>
            <li>
              All views will originate from Google TrueView and will show as “YouTube Advertising” on your YouTube Channel Analytics.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Buildstep0;