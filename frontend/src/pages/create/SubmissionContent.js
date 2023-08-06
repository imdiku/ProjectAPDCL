import '../SimpleForm.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SuccessMessage from './SuccessMessage';


const SubmissionContent = ({ circle, division, subdivision }) => {
  const [formData, setFormData] = useState({
    circle: circle,
    division: division,
    subdivision: subdivision,
    month_of_year: '',
    year: '',
    injection: '',
    unit_billed: '',
    total_IRCA_collection: '',
    demand_IRCA: '',
    no_of_consumers: '',
    no_of_bill_served: '',
    subDivisionbilling_efficiency_perMonth: '',
    subdivision_monthlyPConsumerBilling: '',
    subDivisionAverageRevenueRealisationMonthly: '', 
    subDivisionCollectionEfficiencyMonthly: '',
    ATandC_LossesincludingIRCA: '',

  });

  // const calculateBillingEfficiencymonthly = () => {
  //   const { unit_billed, injection } = formData;

  //   const billingEfficiencymonthlyValue = (unit_billed / injection) * 100;
  //   setBillingEfficiency(billingEfficiencymonthlyValue);
  // };



  const subDivisioncalculateBillingEfficiencymonthly = () => {
    const { unit_billed, injection } = formData;
  
    // Check if both unit_billed and injection are provided and are not zero
    if (unit_billed && injection && unit_billed !== 0 && injection !== 0) {
      // Perform the calculation and return the result
      const billingEfficiencymonthly_subDivisionValue = (unit_billed / injection) * 100;
      return Number(billingEfficiencymonthly_subDivisionValue.toFixed(2)); 
    } else {
      // Return null if either unit_billed or injection is missing or zero
      return null;
    }
  };

  const calculateSubdivisionMonthlyPConsumerBilling = () => {
    const { no_of_bill_served, no_of_consumers } = formData;

    // Check if both no_of_bill_served and no_of_consumers are provided and are not zero
    if (no_of_bill_served && no_of_consumers && no_of_bill_served !== 0 && no_of_consumers !== 0) {
      // Perform the calculation and return the result
      const subdivisionMonthlyPConsumerBillingValue = (no_of_bill_served / no_of_consumers) * 100;
      return Number(subdivisionMonthlyPConsumerBillingValue.toFixed(2)); // Keep only two digits after the decimal point
    } else {
      // Return null if either no_of_bill_served or no_of_consumers is missing or zero
      return null;
    }
  };

  const calculateSubDivisionAverageRevenueRealisationMonthly = () => {
    const { total_IRCA_collection, injection } = formData;

    // Check if both total_IRCA_collection and injection are provided and injection is not zero
    if (total_IRCA_collection && injection && injection !== 0) {
      // Perform the calculation and return the result
      const subDivisionAverageRevenueRealisationMonthlyValue = (total_IRCA_collection / injection) / 10;
      return Number(subDivisionAverageRevenueRealisationMonthlyValue.toFixed(2)); // Keep only two digits after the decimal point
    } else {
      // Return null if either total_IRCA_collection or injection is missing or injection is zero
      return null;
    }
  };

  const calculateSubDivisionCollectionEfficiencyMonthly = () => {
    const { total_IRCA_collection, demand_IRCA } = formData;

    // Check if both total_IRCA_collection and demand_IRCA are provided and demand_IRCA is not zero
    if (total_IRCA_collection && demand_IRCA && demand_IRCA !== 0) {
      // Perform the calculation and return the result
      const subDivisionCollectionEfficiencyMonthlyValue = (total_IRCA_collection / demand_IRCA) * 100;
      return Number(subDivisionCollectionEfficiencyMonthlyValue.toFixed(2)); // Keep only two digits after the decimal point
    } else {
      // Return null if either total_IRCA_collection or demand_IRCA is missing or demand_IRCA is zero
      return null;
    }
  };


  

  
  
  
  
  
  

  
  
  const [showMessage, setShowMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const billingEfficiencymonthly_subDivision = subDivisioncalculateBillingEfficiencymonthly();
    const subdivisionMonthlyPConsumerBilling = calculateSubdivisionMonthlyPConsumerBilling();
    const subDivisionAverageRevenueRealisationMonthly = calculateSubDivisionAverageRevenueRealisationMonthly();
    const subDivisionCollectionEfficiencyMonthly = calculateSubDivisionCollectionEfficiencyMonthly();

  
    // Check if all the required values are available before calculating ATandC_LossesincludingIRCA
    if (
      billingEfficiencymonthly_subDivision !== null &&
      subDivisionCollectionEfficiencyMonthly !== null
    ) {
      const ATandCLossesIncludingIRCAValue =
        (1 - billingEfficiencymonthly_subDivision * (subDivisionCollectionEfficiencyMonthly / 100)) *
        100;
        const positiveATandCLossesIncludingIRCA = Math.abs(ATandCLossesIncludingIRCAValue);
      const updatedFormData = {
        ...formData,
        subDivisionbilling_efficiency_perMonth: billingEfficiencymonthly_subDivision,
        subdivision_monthlyPConsumerBilling: subdivisionMonthlyPConsumerBilling,
        subDivisionAverageRevenueRealisationMonthly: subDivisionAverageRevenueRealisationMonthly,
        subDivisionCollectionEfficiencyMonthly: subDivisionCollectionEfficiencyMonthly,
        ATandC_LossesincludingIRCA: positiveATandCLossesIncludingIRCA,
      };
     
  
      axios.post('/create', updatedFormData)
        .then((response) => {
          console.log(response.data); // Data saved successfully message from the backend
          // Optionally, you can handle success here or notify the user
          setShowMessage(true);
          setTimeout(() => {
            navigate('/create'); 
            window.location.reload();
          }, 500); 
        })
        .catch((error) => {
          console.error('Error:', error); // Log the error if something went wrong
          // Optionally, you can handle the error or notify the user
        });
    } else {
      // Show an error or handle the case where billingEfficiencymonthly is null
      // For example:
      console.error('Error: Billing efficiency calculation failed.');
      return;
    }
  };


  

  return (
    <div className="submission-content-container">
      <div className="submission-content">
      {showMessage ? (
          <SuccessMessage />
        ) : (
        <>
      <h3>Fill the additional details for monthly report</h3>

      <form onSubmit={handleSubmit}>
        <p>Circle: {circle}</p>
        <p>Division: {division}</p>
        <p>Sub-Division: {subdivision}</p>
        {/* New form for additional inputs */}
        
          {/* 10 input fields */}
          <div>
        <label htmlFor="month_of_year">Month:</label>
        <select
          type="text"
          id="month_of_year"
          name="month_of_year"
          value={formData.month_of_year}
          onChange={handleInputChange}
        >
          <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="Febuary">Febuary</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
      </div>
          <div>
          <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              placeholder="Enter Year"
            />
            <label htmlFor="injection">Injection:</label>
            <input
              type="number"
              id="injection"
              name="injection"
              value={formData.injection}
              onChange={handleInputChange}
              placeholder="Enter Injection value"
            />
            <label htmlFor="unit_billed">Unit Billed:</label>
            <input
              type="number"
              id="unit_billed"
              name="unit_billed"
              value={formData.unit_billed}
              onChange={handleInputChange}
              placeholder="Enter Unit Billed value"
            />
          </div>
          {/* ... */}
          <div>
            <label htmlFor="total_IRCA_collection">Total Collection including IRCA:</label>
            <input
              type="number"
              id="total_IRCA_collection"
              name="total_IRCA_collection"
              value={formData.total_IRCA_collection}
              onChange={handleInputChange}
              placeholder="Total Collection including IRCA value"
            />
          </div>

          <div>
            <label htmlFor="demand_IRCA">Current Demand including IRCA:</label>
            <input
              type="number"
              id="demand_IRCA"
              name="demand_IRCA"
              value={formData.demand_IRCA}
              onChange={handleInputChange}
              placeholder="Enter Current Demand including IRCA value"
            />
          </div>

          <div>
            <label htmlFor="no_of_consumers">No of Consumers:</label>
            <input
              type="number"
              id="no_of_consumers"
              name="no_of_consumers"
              value={formData.no_of_consumers}
              onChange={handleInputChange}
              placeholder="Enter No of Consumers in a sub-division"
            />
          </div>

          <div>
            <label htmlFor="no_of_bill_served">No of Bill Served:</label>
            <input
              type="number"
              id="no_of_bill_served"
              name="no_of_bill_served"
              value={formData.no_of_bill_served}
              onChange={handleInputChange}
              placeholder="Enter No of Bill Served in a sub-division"
            />
          </div>


            
            <button type="submit" onClick={handleSubmit}>
                                Submit
                            </button>
          
        </form>
        </>
        )}
      </div>
    </div>
  );
};

export default SubmissionContent;
