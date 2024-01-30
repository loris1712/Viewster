// pages/Home.js
import React, { useEffect }  from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css';

function Home() {

  useEffect(() => {
    
  }, []);
  
  return (
    <div>
      <Header />
        <div className='home-container'>
          <div className="row align-items-start" id="services">
              <div className="col">
                <div className='title'>
                  <h3>Privacy Policy for Viewster</h3>
                </div>
                <div className='description'>
                  Last Updated: November 9, 2023
                </div>
                <div className='description'>
                  At Viewster, we are committed to protecting your privacy and providing a safe online experience. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your personal information when you use our website and services. By accessing or using Viewster, you consent to the terms and practices described in this Privacy Policy.
                </div>
                <div className='subtitle'>
                  <h5>Information We Collect</h5>
                </div>
                <div className='description'>
                  <span>Personal Information:</span> We may collect personal information such as your name, email address, and contact details when you voluntarily provide them while using our website or services.
                </div>
                <div className='description'>
                  <span>Usage Information:</span> We may collect information about how you interact with our website, including your IP address, browser type, pages viewed, and the time and date of your visits.                
                </div>
                <div className='description'>
                  <span>Cookies and Similar Technologies:</span> We may use cookies and similar tracking technologies to enhance your experience and collect data for analytical purposes. You can manage cookie preferences through your browser settings.
                </div>
                <div className='subtitle'>
                  <h5>How We Use Your Information</h5>
                </div>
                <div className='description'>
                  We may use the information we collect for the following purposes:
                </div>
                <div className='description'>
                  <span>Providing Services:</span> To provide you with the services you request, respond to inquiries, and fulfill your requests.
                </div>
                <div className='description'>
                  <span>Improving User Experience:</span> To analyze website usage and trends, identify areas for improvement, and personalize your experience.
                </div>
                <div className='description'>
                  <span>Communications:</span> To send you updates, newsletters, and promotional materials if you have opted in to receive them. You can opt out of these communications at any time.
                </div>
                <div className='description'>
                  <span>Legal Obligations:</span> To comply with applicable laws, regulations, or legal processes.
                </div>
                <div className='subtitle'>
                  <h5>Sharing Your Information</h5>
                </div>
                <div className='description'>
                  We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted third-party service providers and business partners who assist us in operating our website and providing our services. These third parties are required to maintain the confidentiality of your information.
                </div>
                <div className='subtitle'>
                  <h5>Security</h5>
                </div>
                <div className='description'>
                  We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please be aware that no method of internet transmission is completely secure, and we cannot guarantee the absolute security of your data.
                </div>
                <div className='subtitle'>
                  <h5>Your Choices</h5>
                </div>
                <div className='description'>
                  You can exercise certain rights regarding your personal information, such as accessing, correcting, or deleting it. To do so, please contact us at [contact email].
                </div>
                <div className='subtitle'>
                  <h5>Children's Privacy</h5>
                </div>
                <div className='description'>
                  Our website and services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children. If you believe that we have unintentionally collected information from a child, please contact us to have it removed.
                </div>
                <div className='subtitle'>
                  <h5>Changes to this Privacy Policy</h5>
                </div>
                <div className='description'>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The date of the most recent revision will be indicated at the top of this page.
                </div>
                <div className='subtitle'>
                  <h5>Contact Us</h5>
                </div>
                <div className='description'>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or the use of your personal information, please contact us at info@viewster.com.
                </div>

                <div className='description'>
                Thank you for using Viewster!
                </div>

                </div>
          </div>
        </div>
      <Footer />
    </div>
  );
}

export default Home;
