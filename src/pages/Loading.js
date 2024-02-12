// pages/Dashboard.js
import React, { useEffect }  from 'react'
import '../styles/Dashboard.css';
import { useSession } from '../sessionContext';
import { useNavigate, useLocation } from 'react-router-dom';


function Dashboard2() {
  const location = useLocation();
  //const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { login } = useSession();

  useEffect(() => {
    const email = new URLSearchParams(location.search).get('info');

    const fetchUserData = async () => {
      try {
        const response = await fetch("https://viewster-backend.vercel.app/users/userEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (data) {
          login(data[0].email); 
          navigate('/dashboard');
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [location.search, navigate]); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://viewster-backend.vercel.app/users/getUserData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data) {
          //console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []); 

  return (
    <div>
      <div className='loading-component'>
        
      </div>
    </div>
  );
}

export default Dashboard2;
