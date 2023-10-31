// pages/Dashboard.js
import React, { useEffect, useState }  from 'react'
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import '../styles/Dashboard.css';
import { useSession } from '../sessionContext';

function Dashboard2() {
  const [email, setEmail] = useState("");

  
  const { session } = useSession();
  const email2 = session ? session.email : null;

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
  return (
    <div>
      <Navbar />
      <Sidebar />
        <div className='dashboard-component'>
          <input type="email" className="form-control searchbar" id="email" placeholder="Search a campaign" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <div className='table-campaigns'>
          <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Campaign Name</th>
      <th scope="col">Type</th>
      <th scope="col">Starting Date</th>
      <th scope="col">End Date</th>
      <th scope="col"></th>
      <th scope="col">Status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Title Campaign launched</th>
      <td>YouTube</td>
      <td>7-8-2023</td>
      <td>14-8-2023</td>
      <td className='row-actions'>
      <div className='navbar-icon'>
      <svg xmlns="http://www.w3.org/2000/svg" height="22px" fill="#fff" viewBox="0 0 640 512"><path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"/></svg>                    </div>
                    <div className='navbar-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="22px" fill="#fff" viewBox="0 0 384 512"><path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm0 32v64H288V256H96zM240 416h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>                    </div>
      </td>
      <td>
        <button className="btn button-status-complete" type="submit">Complete</button>
      </td>
      <td className='row-last'>
      <div className='navbar-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="22px" fill="#fff" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                    </div>
      </td>
    </tr>
  </tbody>
</table>
          </div>
        </div>
    </div>
  );
}

export default Dashboard2;
