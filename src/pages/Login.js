// pages/Login.js
import React, { useEffect, useState }  from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../sessionContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useSession();

  const { session } = useSession();

  const emailSession = session ? session.email : null;
  useEffect(() => {
    
    if(emailSession){
      navigate('/dashboard');
        window.location.reload();
    }

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
  }, [emailSession, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://viewster-backend.vercel.app/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      //const data = await response.json();
      if (response.status === 200) {
        const userEmail = email; 
        login(userEmail); 
        navigate('/dashboard');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [message, setMessage] = useState('');

  return (
    <div>
      <Header />
        <div className='home-container'>
          <div className="row align-items-start first-section">
              <div className='form-component'>
                <div className='title'>
                    To continue, sign in to Viewster.
                </div>

                <div className='form-component-social-button'>
                  <a href="https://viewster-backend.vercel.app/users/auth/google">
                    <button className="btn btn-primary btn-apple" type="submit">Continue with Google</button>
                  </a>
                </div>
                <div className='text'>or</div>
                <input type="email" className="form-control" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className='row forget_login_container'>
                    {/*<div className='col'>
                        <p className='forget_password' onClick={handleResetPassword}>Did you forget your password?</p>
                    </div>*/}
                    <div className='col col_login_button'>
                        <div className='login_button'>
                            <button className="btn btn-primary" type="submit" onClick={handleSignIn}>Login</button>
                        </div>
                    </div>
                </div>
                {message && <p>{message}</p>}
                <div className='row forget_login_container_bottom'>
                  <div className='col'>
                    <div className='text'>Do not have an account?</div>
                    <div className='form-component-social-button'>
                      <a href="/signup">
                        <button className="btn btn-primary btn-google" type="submit">Create an account.</button>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
          </div>
        </div>
      <Footer />
    </div>
  );
}

export default Login;
