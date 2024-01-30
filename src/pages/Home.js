// pages/Home.js
import React, { useEffect }  from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css';

function Home() {

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
      <Header />
        <div className='home-container'>
          <div className="row align-items-start first-section">
              <div className="col first-section-left">
                <div className='subtitle'>
                  <h4>Introducing Viewster</h4>
                </div>
                <div className='title'>
                  <h1>Take your <span>views</span></h1>
                  <h1>to the next <span>level</span></h1>
                </div>
                <div className='description'>
                  Viewster is an artist-first platform that allows you to promote your music, maximize views and build your community.
                </div>
                <div className='btns-flex'>
                  <button className="btn btn-primary btn-start" type="submit">Start a Campaign</button>
                  <button className="btn btn-secondary btn-login" type="submit">Learn more</button>
                </div>
              </div>
              <div className="col">
                <img src="../../increaseimage.png" className="img-fluid" alt="..." />
              </div>
          </div>
          <div className="row align-items-start home-section" id="services">
              <div className="col">
                <div className='title'>
                  <h3>Our <span>Services</span></h3>
                </div>
                <div className='description w--30'>
                  Viewster is an artist-first platform that allows you to promote your music, maximize views and build your community.
                </div>
                <div className='display-flex'>
                  <div className='service-card transition'>
                    <div className='icon'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="white" viewBox="0 0 640 512"><path d="M272.2 64.6l-51.1 51.1c-15.3 4.2-29.5 11.9-41.5 22.5L153 161.9C142.8 171 129.5 176 115.8 176H96V304c20.4 .6 39.8 8.9 54.3 23.4l35.6 35.6 7 7 0 0L219.9 397c6.2 6.2 16.4 6.2 22.6 0c1.7-1.7 3-3.7 3.7-5.8c2.8-7.7 9.3-13.5 17.3-15.3s16.4 .6 22.2 6.5L296.5 393c11.6 11.6 30.4 11.6 41.9 0c5.4-5.4 8.3-12.3 8.6-19.4c.4-8.8 5.6-16.6 13.6-20.4s17.3-3 24.4 2.1c9.4 6.7 22.5 5.8 30.9-2.6c9.4-9.4 9.4-24.6 0-33.9L340.1 243l-35.8 33c-27.3 25.2-69.2 25.6-97 .9c-31.7-28.2-32.4-77.4-1.6-106.5l70.1-66.2C303.2 78.4 339.4 64 377.1 64c36.1 0 71 13.3 97.9 37.2L505.1 128H544h40 40c8.8 0 16 7.2 16 16V352c0 17.7-14.3 32-32 32H576c-11.8 0-22.2-6.4-27.7-16H463.4c-3.4 6.7-7.9 13.1-13.5 18.7c-17.1 17.1-40.8 23.8-63 20.1c-3.6 7.3-8.5 14.1-14.6 20.2c-27.3 27.3-70 30-100.4 8.1c-25.1 20.8-62.5 19.5-86-4.1L159 404l-7-7-35.6-35.6c-5.5-5.5-12.7-8.7-20.4-9.3C96 369.7 81.6 384 64 384H32c-17.7 0-32-14.3-32-32V144c0-8.8 7.2-16 16-16H56 96h19.8c2 0 3.9-.7 5.3-2l26.5-23.6C175.5 77.7 211.4 64 248.7 64H259c4.4 0 8.9 .2 13.2 .6zM544 320V176H496c-5.9 0-11.6-2.2-15.9-6.1l-36.9-32.8c-18.2-16.2-41.7-25.1-66.1-25.1c-25.4 0-49.8 9.7-68.3 27.1l-70.1 66.2c-10.3 9.8-10.1 26.3 .5 35.7c9.3 8.3 23.4 8.1 32.5-.3l71.9-66.4c9.7-9 24.9-8.4 33.9 1.4s8.4 24.9-1.4 33.9l-.8 .8 74.4 74.4c10 10 16.5 22.3 19.4 35.1H544zM64 336a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm528 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg>
                    </div>
                    <h5>Real Views, Real Users</h5>
                    <p>We drive Real Views and Real Users from YouTube to your videos.</p>
                    <button className="btn btn-primary btn-service" type="submit">Start a Campaign &gt;</button>
                  </div>
                  <div className='service-card transition'>
                    <div className='icon'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="white" viewBox="0 0 512 512"><path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/></svg>
                    </div>
                    <h5>Transparent Reporting</h5>
                    <p>All views purchased show up in your YouTube Analytics as "YouTube Advertising”.</p>
                    <button className="btn btn-primary btn-service" type="submit">Start a Campaign &gt;</button>
                  </div>
                  <div className='service-card transition'>
                    <div className='icon'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="white" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
                    </div>
                    <h5>Delivery Guarantee</h5>
                    <p>You pay only for views that we deliver. Any undelivered views are refunded.</p>
                    <button className="btn btn-primary btn-service" type="submit">Start a Campaign &gt;</button>
                  </div>
                </div>
              </div>
          </div>
          <div className="row align-items-start home-section transition">
              <div className="col">
                <div className='subtitle2'>
                  <h4>Why Viewster</h4>
                </div>
                <div className='title'>
                  <h1><span>We are the right place to build your fanbase and promote your talent.</span></h1>
                </div>
              </div>
          </div>
          <div className="row align-items-start home-section build-your-campaing" id="steps">
              <div className="col">
                <div className='title'>
                  <h3>Build your <span>Campaign</span></h3>
                </div>
                <div className='description w--30'>
                  Quickly set up and manage your Viewster Campaign with these easy steps.
                </div>
                <div className='timeline-section'>
                  <div className='timeline-step transition'>
                    <div>
                      <div className='rounded-circle-object'></div>
                      <div className='vertical-hr'></div>
                    </div>
                    <div className='display-flex2'>
                      <div className='timeline-text'>
                        <h3>1. Create your account</h3>
                        <h5><span>Create an account</span> in under 1 minute by providing us with some basic information on yourself.</h5>
                      </div>
                    </div>
                  </div>
                  <div className='timeline-step transition'>
                    <div>
                      <div className='rounded-circle-object'></div>
                      <div className='vertical-hr'></div>
                    </div>
                    <div className='display-flex2'>
                      <div className='timeline-text'>
                        <h3>2. Set up your campaign</h3>
                        <h5><span>Set up your campaign</span> by providing us with the link to the video your want to promote, your budget, whether you want to optimize for views or fans, and whether you want the cheapest worldwide views or targetted country specific views.</h5>
                      </div>
                    </div>
                  </div>
                  <div className='timeline-step transition'>
                    <div>
                      <div className='rounded-circle-object'></div>
                      <div className='vertical-hr'></div>
                    </div>
                    <div className='display-flex2'>
                      <div className='timeline-text'>
                        <h3>3. Review your estimated Video Views</h3>
                        <h5>Viewster will show you <span>how many views</span> you can expect to receive based on your Campaign set up.</h5>
                      </div>
                    </div>
                  </div>
                  <div className='timeline-step transition'>
                    <div>
                    <div className='rounded-circle-object'></div>
                    </div>
                    <div className='display-flex2'>
                      <div className='timeline-text'>
                        <h3>4. Pay and Begin</h3>
                        <h5>Thats it! <span>Pay for your campaign</span> and Viewster will do the rest!</h5>
                        <button className="btn btn-primary btn-start-timeline" type="submit">Start now</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="row align-items-start home-section" id="pricing">
              <div className="col">
                <div className='title'>
                  <h3>Our Pricing</h3>
                </div>
                <div className='description w--60'>
                  Our packages are optimzed to get you the maximum global views for videos. You can also customize any package and target to any particular country.
                </div>
                <div className='display-flex'>
                  <div className='pricing-card transition'>
                    <h5>
                      50,000 Views
                    </h5>
                    <p>
                      Great Starting Point for Most
                    </p>
                    <div className='pricing-hr'></div>
                    <div className='pricing-values'>
                      <div className='pricing-value'>
                        <div className='icon'>
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                        </div>
                        <div className='text'>50,000 Global Views</div>
                      </div>
                      <div className='pricing-value'>
                        <div className='icon'>
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                        </div>
                        <div className='text'>Starts in 1 Business Day</div>
                      </div>
                      <div className='pricing-value'>
                        <div className='icon'>
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                        </div>
                        <div className='text'>Undelivered Views are Refunded</div>
                      </div>
                    </div>
                    <div className='pricing-amount'>
                      $325
                    </div>
                    <button className="btn btn-primary btn-pricing" type="submit">Start a Campaign</button>
                  </div>
                  <div className='pricing-card-colored transition'>
                    <h5>
                      100,000 Views
                    </h5>
                    <p>
                      Great Value and Most Ordered
                    </p>
                    <div className='pricing-hr'></div>
                    <div className='pricing-values'>
                      <div className='pricing-value'>
                        <div className='icon'>
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                        </div>
                        <div className='text'>100,000 Global Views</div>
                      </div>
                      <div className='pricing-value'>
                        <div className='icon'>
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                        </div>
                        <div className='text'>Starts in 1 Business Day</div>
                      </div>
                      <div className='pricing-value'>
                        <div className='icon'>
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                        </div>
                        <div className='text'>Undelivered Views are Refunded</div>
                      </div>
                    </div>
                    <div className='pricing-amount'>
                      $650
                    </div>
                    <button className="btn btn-primary btn-pricing" type="submit">Start a Campaign</button>
                  </div>
                  <div className='pricing-card transition'>
                    <h5>
                      Custom Views
                    </h5>
                    <p>
                      Customize your Views
                    </p>
                    <div className='pricing-hr'></div>
                    <div className='pricing-values'>
                      <div className='pricing-value'>
                        <div className='icon'>
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                        </div>
                        <div className='text'>You choose how many views</div>
                      </div>
                      <div className='pricing-value'>
                        <div className='icon'>
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                        </div>
                        <div className='text'>You choose Global or Country Targetted</div>
                      </div>
                      <div className='pricing-value'>
                        <div className='icon'>
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                        </div>
                        <div className='text'>Undelivered Views are Refunded</div>
                      </div>
                    </div>
                    <div className='pricing-amount'>
                      $Custom
                    </div>
                    <button className="btn btn-primary btn-pricing" type="submit">Start a Campaign</button>
                  </div>
                </div>
              </div>
          </div>
          <div className="row align-items-start home-section" id="testimonials">
              <div className="col">
                <div className='title'>
                  <h3>Testimonials</h3>
                </div>
                <div className='display-flex testimonials-section'>
                  <div className='testimonial-card transition'>
                    <div className='icon'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"/></svg>
                    </div>
                    <p>Viewster delivered! We wanted to boost our video and Viewster got us 100,000 views in 48 hours. The traffic shows up as "YouTube Advertising" in our Analytics. I highly recommend them!</p>
                    <div className='author'>
                      {/*<div className='author-image'>
                        <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" className="img-thumbnail" alt="..." />
  </div>*/}
                      <div className='author-information'>
                        <div className='author-name'>
                          Josh
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='testimonial-card transition'>
                    <div className='icon'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"/></svg>
                    </div>
                    <p>Super easy to use, select the video, the number of views you need or your budget and boom! Totally satisfied and will use them for all artists that we manage.</p>
                    <div className='author'>
                      <div className='author-information'>
                        <div className='author-name'>
                          Ben
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='testimonial-card transition'>
                    <div className='icon'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"/></svg>
                    </div>
                    <p>My video was taken down due to copyright claim in the middle of my campaign. I thought I would lose my money, but Viewster stuck to their word. They only charged me for the 40k impressions that were delivered and refunded the rest of the fee to me. I love this! </p>
                    <div className='author'>
                      
                      <div className='author-information'>
                        <div className='author-name'>
                          Jon
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='testimonial-card transition'>
                    <div className='icon'>
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"/></svg>
                    </div>
                    <p>1 million views in 8 days. Do I need to say more?</p>
                    <div className='author'>
                      
                      <div className='author-information'>
                        <div className='author-name'>
                          Jennifer
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="row align-items-start home-section">
              <div className="col">
                <div className='title questions-title'>
                  <h3>Frequently asked questions</h3>
                </div>
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <div className='icon'>
                        </div>
                        What is Viewster?
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Viewster is an artist-first platform that allows you to promote your music, maximize views and build your community. Viewster allows you to easily set up and drive views to your videos on YouTube from real viewers who will choose to engage with it. The traffic is 100% real, there are no bots, the views will count towards your total view count and show up as "YouTube Advertising" in your analytics dashboard and you only pay for the views that we deliver. This is 100% safe and 100% legitimate traffic.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <div className='icon'>
                        </div>
                        Are the views real users or Bots?
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        The views are from 100% real users on YouTube who will see your video as an ad. There are no bots, the traffic is 100% real and will show up as "YouTube Advertising" in your analytics dashboard on YouTube. This is 100% safe and 100% legitimate traffic.
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <div className='icon'>
                        </div>
                        What is the Delivery Guarantee?
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Viewster will only charge you for the views that we can successfully deliver. If, for any reason, we cannot deliver the views that you have purchased, the amount you paid for the undelivered views will be refunded to you. That is a Delivery Guarantee that no one in the business can offer!
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="heading4">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapseThree">
                        <div className='icon'>
                        </div>
                        What kind of videos can I promote?
                      </button>
                    </h2>
                    <div id="collapse4" className="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        You can promote any videos on YouTube as long as they do not violate the YouTube Terms of Service or Community Guidelines. YouTube always has the right to stop advertising on videos that it believes violates its Terms of Service or Community Guidelines including videos that promote Spam, Nudity, Sexual Content, Violence, Guns, Drug Use, Illegal Goods or Misinformation. Please verify that your video adheres to the guidelines set forth on YouTube including on <a href="https://support.google.com/youtube/answer/9288567">YouTube's Community Guidelines</a>
                      </div>
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

export default Home;
