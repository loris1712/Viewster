import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';
import { useSession } from '../sessionContext';
import { useHistory } from "react-router-dom";

const Sidebar = () => {
  const { login, logout } = useSession();
  const history = useHistory();

  const handleLogout = () => {
    // Chiamiamo la funzione di logout dal contesto di sessione
    logout();
    history.push('/login');
    window.location.reload();
    // Effettuare altre azioni, come reindirizzamento o pulizia
  };

  return (
    <div className="sidebar">
      <a className="navbar-brand" href="/">Viewster</a>
      <div>
        <button className="btn btn-primary button-start-campaign" type="submit">Build a Campaign</button>
      </div>

      <div className='sidebar-list'>
        <div className='title-list'>
          MAIN
        </div>
        <div className='pages-list'>
          <div className='page-list'>
            <NavLink exact to="/dashboard" activeClassName="active">
              All Campaigns
            </NavLink>
          </div>

          <div className='page-list'>
            <NavLink to="/messages" activeClassName="active">
              Messages
            </NavLink>
          </div>

          <div className='page-list'>
            <NavLink to="/invoices" activeClassName="active">
              Invoices
            </NavLink>
          </div>

          
        </div>
      </div>
      
      <div className='page-list page-list-logout' onClick={handleLogout}>
            Logout
          </div>
    </div>
  );
};

export default Sidebar;
