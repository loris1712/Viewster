import React, { useState, useEffect } from 'react';
import '../../styles/BuildStep.css';
import Select from 'react-select';

const options = [
  { value: 'Drugs', label: 'Drugs' },
  { value: 'Guns', label: 'Guns' },
  { value: 'Nudity', label: 'Nudity' },
  { value: 'Explicit Lyrics', label: 'Explicit Lyrics' },
];

function BuildStep2({ data, updateData, step, onNext, currentStep, steps, closeCampaignBuilder, prevStep, nextStep }) {
  const [title, setTitle] = useState(data.title || '');
  const [videoLink, setVideoLink] = useState(data.videoLink || '');
  const [startDate, setStartDate] = useState(data.startDate || '');
  const [endDate, setEndDate] = useState(data.endDate || '');
  const [days, setDays] = useState(data.days || '');
  const [type, setType] = useState(data.type || '');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [viewsType, setViewsType] = useState(data.viewsType || '');
  const [area, setArea] = useState(data.area || 'Global');
  const [priceBy, setPriceBy] = useState(data.priceBy || '');
  const [numberViews, setNumberViews] = useState(data.numberViews || ''); // add int not string
  const [budget, setBudget] = useState(parseFloat(data.budget) || '');
  const [views, setViews] = useState(0);
  const [finalViews, setFinalViews] = useState(0);

  const handleSubmit = () => {
    if (isFormValid()) {
      updateData({ title, videoLink, startDate, endDate, days, type, selectedOptions, viewsType, priceBy, finalViews, budget, area });
      onNext();
    }
  };

  const isFormValid = () => {
    const basicConditions = priceBy && budget && area;
    const viewsCondition = views || numberViews;

    return basicConditions && viewsCondition;
  };

  const handleChange = (event) => {
    const { value, checked } = event.target;
    const newSelectedOptions = checked
      ? [...selectedOptions, value]
      : selectedOptions.filter(option => option !== value);

    setSelectedOptions(newSelectedOptions);
  };

  const calculateViews = (budget, area) => {
    let costPerView;
    if (area === 'Global') {
      costPerView = budget > 1000 ? 0.006 : 0.0065;
    } else if (area === 'US') {
      costPerView = 0.018;
    }
    return Math.floor(budget / costPerView);
  };

  const calculateBudget = (views, area) => {
    let costPerView;
    if (area === 'Global') {
      costPerView = budget > 1000 ? 0.006 : 0.0065;
    } else if (area === 'US') {
      costPerView = 0.018;
    }
    return parseFloat(views * costPerView);
  };

  const handleChangeBudget = (e) => {
    const newBudget = e.target.value;
    const re = /^[0-9\b]+$/;

    // Se il valore è vuoto o corrisponde all'espressione regolare per i numeri interi
    if (e.target.value === '' || re.test(e.target.value)) {
      setBudget(e.target.value);
    }
  
    if (priceBy === "Budget") {
      // Calcola le visualizzazioni qui...
      const calculatedViews = calculateViews(newBudget, area);
      setViews(calculatedViews);
      setFinalViews(calculatedViews);
    }
  };

  const handleNumberViewsChange = (e) => {
    const newNumberViews = e.target.value;
    setViews(newNumberViews);
    setFinalViews(newNumberViews);
    if (priceBy === "Number of Views desired") {
      // Calcola il budget qui...
      const calculatedBudget = calculateBudget(newNumberViews, area);
      setBudget(calculatedBudget);
    }
  };

  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: '1B1B1B',
      borderColor: 'grey',
      color: 'white',
      cursor: 'pointer',
      borderRadius: '100px',
    }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? 'grey' : 'black',
        color: 'white',
        cursor: 'pointer',
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: '383838',
        borderRadius: '100px',
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'white',
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: 'white',
      ':hover': {
        backgroundColor: 'red',
        color: 'white',
      },
    }),
  };

  useEffect(() => {
    if (priceBy === "Budget") {
      // Se l'utente sta pianificando in base al budget, ricalcola le visualizzazioni.
      const calculatedViews = calculateViews(budget, area);
      setViews(calculatedViews);
      setFinalViews(calculatedViews);
    } else if (priceBy === "Number of Views desired" && views) {
      // Se l'utente ha specificato un numero di visualizzazioni desiderate, ricalcola il budget.
      const calculatedBudget = calculateBudget(views, area);
      setBudget(calculatedBudget);
    }
  }, [area, priceBy, budget, views]);

  return (
    <div className='buildstep-container'>
      <h2>{step}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='row align-items-start first-section step-container'>
          <div className='col'>
            <div className='multi-select'>
            <h3>Does the video have (select all that apply)</h3>
            <div className='options'>
              {options.map((option, index) => (
                <div>
                  <label key={index} className='checkbox-label'>
                    <input
                      type='checkbox'
                      name={option.value}
                      value={option.value}
                      checked={selectedOptions.includes(option.value)}
                      onChange={handleChange}
                    />
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            </div>
          </div>
          
          <div className='col'>
            {/*<div>
              <h3>Campaign Type</h3>
              <div className='labels-container'>
                  <label className='label-container'>
                    <input
                      type="radio"
                      value="Targeted"
                      checked={viewsType === "Targeted"}
                      onChange={() => setViewsType("Targeted")}
                      className="radio-checkbox"
                    />
                    <div className=''>
                      <h4>Targeted</h4>
                    </div>
                  </label>

                  <label className='label-container'>
                    <input
                      type="radio"
                      value="Non Targeted (Maximize Views)"
                      checked={viewsType === "Non Targeted (Maximize Views)"}
                      onChange={() => setViewsType("Non Targeted (Maximize Views)")}
                      className="radio-checkbox"
                    />
                    <div className=''>
                      <h4>Non Targeted (Maximize Views)</h4>
                    </div>
                  </label>
              </div>
              </div>*/}

            <div>
              <h3>Select Target Countries</h3>
              <div className='labels-container'>
                  <label className='label-container'>
                    <input
                      type="radio"
                      value="Global"
                      checked={area === "Global"}
                      onChange={() => setArea("Global")}
                      className="radio-checkbox"
                    />
                    <div className=''>
                      <h4>Global (cheapest)</h4>
                    </div>
                  </label>

                  <label className='label-container'>
                    <input
                      type="radio"
                      value="US"
                      checked={area === "US"}
                      onChange={() => setArea("US")}
                      className="radio-checkbox"
                    />
                    <div className=''>
                      <h4>Only US (most expensive)</h4>
                    </div>
                  </label>
              </div>
            </div>
          </div>
        </div>

        <div className='row align-items-start first-section step-container'>
          <div className='col'>
            <div>
            <h3>Price by</h3>
            <div className='labels-container'>
              <label className='label-container'>
                <input
                  type="radio"
                  value="Budget"
                  checked={priceBy === "Budget"}
                  onChange={() => setPriceBy("Budget")}
                  className="radio-checkbox"
                />
                 <div className=''>
                  <h4>Budget</h4>
                </div>
              </label>
            </div>
            <div className='budget-container'>
              <div className="input-group  w-70">
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  value={priceBy == "Budget" ? budget : ''}
                  onChange={handleChangeBudget}
                  placeholder="Enter your budget"
                  className="form-control input-field-text-2"
                  disabled={priceBy !== "Budget"}
                />
              </div>
              <div className='input-field-counter'>
                {priceBy == "Budget" ? views.toLocaleString('en-US') : '0'} views
              </div>  
            </div>
            </div>
          </div>
          <div className='col'>
            <div>
            <div className='labels-container right-col'>
              <label className='label-container'>
                <input
                  type="radio"
                  value="Number of Views desired"
                  checked={priceBy === "Number of Views desired"}
                  onChange={() => setPriceBy("Number of Views desired")}
                  className="radio-checkbox"
                />
                 <div className=''>
                  <h4>Number of Views desired</h4>
                </div>
              </label>
            </div>
            <div className='budget-container'>
              <input
                type="text"
                value={priceBy == "Number of Views desired" ? views : ''}
                onChange={handleNumberViewsChange}
                placeholder="Enter number of views"
                className="form-control input-field-text-2 w-70"
                disabled={priceBy !== "Number of Views desired"}
              />
              <div className='input-field-counter'>
                $ {priceBy === "Number of Views desired" && !isNaN(parseFloat(budget)) ? parseFloat(budget).toLocaleString('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }) : '0.00'}
              </div>

            </div>
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

export default BuildStep2;
