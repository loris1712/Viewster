import React, { useEffect, useState }  from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';
import { useSession } from '../sessionContext';

const Sidebar = () => {
  const { session, logout } = useSession();
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);
  const [unreadFlag, setUnreadFlag] = useState(false);
  
  const checkUnreadMessages = (apiChatData, localChatData) => {
    if (!localChatData) return;
  
    const updatedChatData = [];
  
    apiChatData.forEach(apiChat => {
      const localChat = localChatData[apiChat.id];
      if (!localChat) {
        apiChat.unread = true;
        updatedChatData.push(apiChat);
      } else {
        const apiUpdatedAt = new Date(apiChat.updated_at);
        const localUpdatedAt = new Date(localChat.updated_at);
        apiChat.unread = apiUpdatedAt > localUpdatedAt || localChat.unread;
        updatedChatData.push(apiChat);
      }
    });
  
    if (updatedChatData.some(chat => chat.unread)) {
      setUnreadFlag(true);
    }
  };

  useEffect(() => {
    const sessionEmail = session ? session.email : null;

    fetch("https://viewster-backend.vercel.app/tickets/getTickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        email: sessionEmail,
       }),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.length> 0){

          setChats(data);
        
          const localChatData = JSON.parse(localStorage.getItem('chatData')) || {};
          //console.log(localChatData)
          checkUnreadMessages(data, localChatData);
        }
      });
  }, [session]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <NavLink className="navbar-brand" to="/dashboard">Viewster</NavLink>
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
              Messages <span className={`unread-container ${unreadFlag  === true ? 'unread-true' : ''}`}></span>
            </NavLink>
          </div>

          {/*<div className='page-list'>
            <NavLink 
              to="/invoices" 
              className={({ isActive }) => isActive ? "active" : undefined}>
              Invoices
            </NavLink>
          </div>*/}
        </div>
      </div>
      
      <div className='page-list page-list-logout' onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
