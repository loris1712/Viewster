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
                  <h3>Terms and Conditions for Viewster</h3>
                </div>
                <div className='description'>
                  Last Updated: November 9, 2023
                </div>
                <div className='description'>
                  Welcome to Viewster! These Terms and Conditions ("Terms") govern your use of our platform, Viewster, which provides advertising services, including the management and running of Google TrueView ads for clients. By accessing or using Viewster, you agree to be bound by these Terms.
                </div>
                <div className='subtitle'>
                  <h5>1. Acceptance of Terms</h5>
                </div>
                <div className='description'>
                  By using Viewster, you affirm that you are of legal age to enter into this agreement, or you have obtained parental or guardian consent if you are under the legal age. If you do not agree to these Terms, please do not use Viewster.                </div>
                <div className='subtitle'>
                  <h5>2. Use of Viewster</h5>
                </div>
                <div className='description'>
                  2.1 <span>Account Registration:</span> To use certain features of Viewster, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.                </div>
                <div className='description'>
                  2.2 <span>Client Agreements:</span>  Viewster provides advertising services to clients. When you engage our services, you may enter into separate agreements with Viewster outlining the specific terms and conditions of those services. These agreements will govern your relationship with Viewster in addition to these Terms.
                </div>
                <div className='subtitle'>
                  <h5>3. Content and Use</h5>
                </div>
                <div className='description'>
                  3.1 <span>User Content:</span> You may have the opportunity to submit content, such as ad creatives, to Viewster. By submitting content, you grant Viewster a worldwide, non-exclusive, royalty-free, and sublicensable license to use, reproduce, modify, adapt, publish, and display the content for the purpose of providing advertising services.
                </div>
                <div className='description'>
                  3.2 <span>Prohibited Conduct:</span> You agree not to engage in any conduct that:
                  Violates any applicable laws, regulations, or third-party rights. Is harmful, fraudulent, deceptive, or misleading. Interferes with the operation of Viewster or the use and enjoyment of other users. Violates the privacy of others. Contains viruses, malware, or any harmful code. 
                </div>
                <div className='subtitle'>
                  <h5>4. Fees and Payments</h5>
                </div>
                <div className='description'>
                  4.1 <span>Payment Terms:</span> Fees for Viewster's services are outlined in your client agreements. You agree to pay all fees as specified in those agreements.
                </div>
                <div className='description'>
                  4.2 <span>Billing and Invoices:</span> Viewster will provide you with invoices and payment instructions. Payment terms and methods will be outlined in your client agreements.
                </div>
                <div className='subtitle'>
                  <h5>5. Intellectual Property</h5>
                </div>
                <div className='description'>
                  5.1 <span>Ownership:</span> Viewster and its licensors retain all rights, title, and interest in and to Viewster, including all content, logos, trademarks, and intellectual property. You may not use our intellectual property without our written consent.
                </div>
                <div className='subtitle'>
                  <h5>6. Disclaimer of Warranties</h5>
                </div>
                <div className='description'>
                  Viewster is provided "as is" and "as available" without any warranties of any kind, whether express or implied. We do not guarantee the accuracy, completeness, or suitability of the information and materials found on Viewster.
                </div>
                <div className='subtitle'>
                  <h5>7. Limitation of Liability</h5>
                </div>
                <div className='description'>
                  To the extent permitted by law, Viewster and its affiliates will not be liable for any indirect, incidental, consequential, punitive, or special damages arising out of or in connection with your use of Viewster or the services provided.
                </div>
                <div className='subtitle'>
                  <h5>8. Termination</h5>
                </div>
                <div className='description'>
                  Viewster may terminate or suspend your access to the platform at any time for any reason, including violation of these Terms.
                </div>
                <div className='subtitle'>
                  <h5>9. Changes to Terms</h5>
                </div>
                <div className='description'>
                  Viewster may update these Terms from time to time. The most recent version will be posted on the platform. Your continued use of Viewster after any changes to these Terms constitutes your acceptance of the updated Terms.
                </div>
                <div className='subtitle'>
                  <h5>10. Contact Us</h5>
                </div>
                <div className='description'>
                  If you have any questions, concerns, or requests regarding these Terms or your use of Viewster, please contact us at info@viewster.com.
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
