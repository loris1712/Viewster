import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { useSession } from '../sessionContext';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const { session } = useSession();
  console.log(session);
  const email = session ? session.email : null;

  // Mappa l'URL corrente a un nome di pagina
  const getPageTitle = () => {
    switch (path) {
      case '/dashboard':
        return 'All Campaigns';
      case '/messages':
        return 'Messages';
      case '/invoices':
        return 'Invoices';
      default:
        return 'Page Not Found';
    }
  };

  const pageTitle = getPageTitle();

  return (
    <div className="navbar2">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <div className='page-title'>{pageTitle}</div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div className='flex-right-component'>
                <div className='navbar-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" fill="#7D8590" viewBox="0 0 448 512"><path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>
                </div>
                <div className='user-info'>
                    <div className='user-image'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16px" fill="#fff" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                    </div>
                    <div className='user-nickname'>
                    {email &&(
                      email
                    )}
                    </div>
                    <div className='navbar-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="10px" fill="#fff" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </nav>
    </div>
  );
};

export default Navbar;