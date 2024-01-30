import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';
import { useSession } from '../sessionContext';

const Sidebar = () => {
  const { login, logout } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    // In genere non è consigliabile usare window.location.reload() in una SPA
    // Se hai bisogno di reinizializzare lo stato, considera di farlo tramite React Context o Redux
  };

  return (
    <div className="sidebar">
      <NavLink className="navbar-brand" to="/">Viewster</NavLink>
      <NavLink to="/build">
        <div>
          <button className="btn btn-primary button-start-campaign" type="submit">Build a Campaign</button>
        </div>
      </NavLink>

      <div className='sidebar-list'>
        <div className='title-list'>
          MAIN
        </div>
        <div className='pages-list'>
          <div className='page-list'>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? "active" : undefined}>
              All Campaigns
            </NavLink>
          </div>

          <div className='page-list'>
            <NavLink 
              to="/messages" 
              className={({ isActive }) => isActive ? "active" : undefined}>
              Messages
            </NavLink>
          </div>

          <div className='page-list'>
            <NavLink 
              to="/invoices" 
              className={({ isActive }) => isActive ? "active" : undefined}>
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
