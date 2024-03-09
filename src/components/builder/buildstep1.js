import React, { useState, useEffect } from 'react';
import '../../styles/BuildStep.css';

function BuildStep1({ data, updateData, step, onNext, currentStep, steps, closeCampaignBuilder, prevStep, nextStep }) {
  const [title, setTitle] = useState(data.title || '');
  const [videoLink, setVideoLink] = useState(data.videoLink || '');
  const [startDate, setStartDate] = useState(data.startDate || '');
  const [endDate, setEndDate] = useState(data.endDate || '');
  const [days, setDays] = useState(data.days || '');
  const [type, setType] = useState(data.type || '');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [viewsType, setViewsType] = useState(data.viewsType || '');
  const [area, setArea] = useState(data.area || '');
  const [priceBy, setPriceBy] = useState(data.priceBy || '');
  const [numberViews, setNumberViews] = useState(data.numberViews || '');
  const [budget, setBudget] = useState(data.budget || '');
  const [finalViews, setFinalViews] = useState(0);

  const [isValid, setIsValid] = useState(true);

  const handleSubmit = () => {
    if (isFormValid()) {
      updateData({ title, videoLink, startDate, endDate, days, type, selectedOptions, viewsType, priceBy, finalViews, budget, area });
      onNext();
    }
  };
  const today = new Date();
  const twoDaysLater = new Date(today.getTime() + (2 * 24 * 60 * 60 * 1000)); 
  const twoDaysLaterString = twoDaysLater.toISOString().split('T')[0];

  const isStartDateValid = () => {
    const today_date = new Date().toISOString().split('T')[0];
    return startDate >= today_date;
  };

  const isEndDateValid = () => {
    return endDate > startDate;
  };

  const isFormValid = () => {
    return type && isStartDateValid() && isEndDateValid() && days && title && videoLink;
  };

  function validaUrlYouTube(url) {
    var regExpStandard = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    var regExpUnlisted = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[^\s&]+(&list=)?$/;
    var regExpPublic = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[^\s]+$/;

    return url.match(regExpStandard) && (url.match(regExpUnlisted) || url.match(regExpPublic));
  }

  function handleInputChange(e) {
    const url = e.target.value;
    setVideoLink(url);
    setIsValid(validaUrlYouTube(url));
  }

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
    }
  }, [startDate, endDate]);

  return (
    <div className='buildstep-container'>
      <h2>{step}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='row align-items-start first-section step-container'>
          <div className='col'>
          <h3>Type</h3>
            <div className='labels-container'>
              <label className='label-container'>
                <input
                  type="radio"
                  value="YouTube"
                  checked={type === "YouTube"}
                  onChange={() => setType("YouTube")}
                  className="radio-checkbox"
                />
                 <div className=''>
                  <h4>YouTube</h4>
                </div>
              </label>

              <label className='label-container'>
                <input
                  type="radio"
                  value="Spotify"
                  checked={type === "Spotify"}
                  onChange={() => setType("Spotify")}
                  className="radio-checkbox"
                  disabled
                />
                <div className=''>
                  <h4>Spotify</h4>
                  <p className='h6'>Coming soon</p>
                </div>
              </label>

              <label className='label-container'>
                <input
                  type="radio"
                  value="TikTok"
                  checked={type === "TikTok"}
                  onChange={() => setType("TikTok")}
                  className="radio-checkbox"
                  disabled
                />
                <div className=''>
                  <h4>TikTok</h4>
                  <p className='h6'>Coming soon</p>
                </div>
              </label>
            </div>
            
          </div>

          <div className='col'>
            <div className='row'>
              <div className='col'>
                <h3>Start date</h3>
                <div className="date-picker">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="form-control input-field-time"
                    min={twoDaysLaterString}
                  />
                </div>
              </div>
              
              <div className='col'>
                <h3>End date</h3>
                <div className="date-picker">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="form-control input-field-time"
                    min={startDate}
                  />
                </div>
              </div>

              <div className='col'>
                <h3>Days</h3>
                <div className="date-picker">
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    placeholder="Days"
                    className="form-control input-field-time"
                    disabled
                  />
                </div>
              </div>
              
              
            </div>
          </div>
        </div>

        <div className='row align-items-start first-section step-container'>
          <div className='col'>
          <div>
            <h3>Title</h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your compaign name"
              className="form-control input-field-text"
            /> 
          </div>
            
          </div>

          <div className='col'>
          <div className=''>
            <div style={{display:'flex', alignItems:'baseline'}}>
              <h3>YouTube Video Link </h3>
              <div className='subtitle'> &nbsp; (must be unlisted or Public)</div>
            </div>

              <input
                type="text"
                value={videoLink}
                onChange={handleInputChange}
                placeholder="YouTube Video Link"
                className={`form-control input-field-text ${isValid ? '' : 'is-invalid'}`}
              />
              {!isValid && <div className="invalid-feedback">
                Please enter a valid YouTube URL.
              </div>}
            </div>
          </div>
        </div>
        
        <div className='builder-controls'>
              {currentStep === 0 ? (
                <button className="button-back-builder" type="submit" onClick={closeCampaignBuilder}>Back</button>
              ) : (
                <button className="button-back-builder" onClick={prevStep}>Back</button>
              )}
              <button className="btn btn-primary button-next-builder" onClick={handleSubmit} 
                        disabled={!isFormValid() || currentStep === steps.length - 1}>Next</button>
                        {/*!isFormValid() || */}
              </div>
      </form>
    </div>
  );
}

export default BuildStep1;
