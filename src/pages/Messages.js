// pages/Messages.js
import React, { useEffect, useState }  from 'react'
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import '../styles/Messages.css';
import { useSession } from '../sessionContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthGuard from './api/authGuard';

function ChatList({ onSelectChat, selectedChat }) {
  const [chats, setChats] = useState([]);
  const { session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);

  const saveChatDataToLocalStorage = (data) => {
    const storedChatData = JSON.parse(localStorage.getItem('chatData')) || {};
    
    data.forEach(chat => {
      storedChatData[chat.id] = { unread: chat.unread === undefined ? true : chat.unread, updated_at: chat.updated_at };
    });
  
    localStorage.setItem('chatData', JSON.stringify(storedChatData));
  };

  useEffect(() => {
    const sessionEmail = session ? session.email : null;
    //https://viewster-backend.vercel.app/tickets/getTickets
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
      saveChatDataToLocalStorage(updatedChatData);
    }
  
    setFilteredTickets(updatedChatData);
  };

  useEffect(() => {
    if (Array.isArray(chats)) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = chats.filter(chat => 
        chat.subject && chat.subject.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredTickets(filtered);
    }
  }, [searchQuery, chats]);

  const handleChatClick = (chatId) => {
    const selectedChat = filteredTickets.find(chat => chat.id === chatId);
    selectedChat.unread = false;
  
    const localChatData = JSON.parse(localStorage.getItem('chatData')) || {};
    
    if (localChatData[chatId]) {
      localChatData[chatId].unread = false;
      localStorage.setItem('chatData', JSON.stringify(localChatData));
    }
  
    onSelectChat(chatId);
  };

  return (
    <div className="chat-list">
      <input type="email" className="form-control searchbar" id="email" placeholder="Search a ticket" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
      {filteredTickets.map((chat) => {
        const regex = /(["'])(.*?)\1/;
        const matches = chat.subject.match(regex);
        let subjectText = chat.subject;
        if (matches && matches.length >= 2) {
          subjectText = matches[2];
        }
        //console.log(filteredTickets)
        return (
          <div key={chat.id} onClick={() => handleChatClick(chat.id)} className={`chat-container ${Number(selectedChat) === chat.id ? 'selected-chat' : ''}`}>
            <div className='chat-subject'>
              {subjectText} <span className={`unread-container ${chat.unread  === true ? 'unread-true' : ''}`}></span>
            </div>
            <div className='chat-updated-at'>
              {new Date(chat.updated_at).toLocaleDateString('en-US', {
                month: '2-digit', 
                day: '2-digit', 
                year: 'numeric'
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Replies({ selectedChat }) {
  const [messages, setMessages] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const { session } = useSession();

  useEffect(() => {
  
    fetch("https://viewster-backend.vercel.app/tickets/getConversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ticketId: selectedChat,
       }),
    })
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [selectedChat]);

  const handleResponseChange = (e) => {
    setResponseMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (!responseMessage.trim()) return; 
    const sessionEmail = session ? session.email : null;
    //console.log(responseMessage);
    fetch("https://viewster-backend.vercel.app/tickets/replyTicket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketId: selectedChat,
        replyMessage: responseMessage,
        userEmail: sessionEmail,
      }),
    })
    .then(res => res.json())
    .then(data => {
      setMessages([...messages, data]);
      setResponseMessage('');
    })
    .catch(error => console.error('Error:', error));
  };

  const processMessage = (message) => {
    const pattern = /^Message from .*?:/;
    return message.replace(pattern, '').trim();
  };  
  
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short' };
    return date.toLocaleDateString('en-US', options).replace(',', '');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="messages">
      <div className='messages-container'>
        <div className={`message`}>
          Your order has been processed. Our team will review the ad and begin the campaign within 2 business days. You will receive a notification when the campaign has started and reports will be updated daily on Views and Budgets in "All Campaigns".
        </div>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.body_text.startsWith('Message from') ? 'message-from' : ''}`}>
            {processMessage(message.body_text)}

            <p className='message-time'>{formatCreatedAt(message.created_at)}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input 
          type="text" 
          className="form-control reply-input" 
          placeholder="Message"
          value={responseMessage}
          onChange={handleResponseChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSubmit} className="btn send-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="white"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
        </button>
      </div>
    </div>
  );
}

function Messages() {
  const [searchParams, setSearchParams] = useSearchParams();
  let id = searchParams.get("id")
  const [selectedChat, setSelectedChat] = useState(id ? id : null);

  return (
    <div>
      <AuthGuard>
      <Navbar />
      <Sidebar />
        <div className='dashboard-component'>
          <div className="row align-items-start first-section">
            <div className="col w-30-2">
              <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
            </div>
            <div className="col w-70-2">
              {selectedChat && <Replies selectedChat={selectedChat} />}
            </div>
        </div>
        </div>
        </AuthGuard>
    </div>
  );
}

export default Messages;