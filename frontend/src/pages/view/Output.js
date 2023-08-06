import React, { useState } from 'react';
import axios from 'axios';
import './view.css';


const Output = () => {
  const [circle, setCircle] = useState('');
  const [year, setYear] = useState('');
  const [month_of_year, setMonth] = useState('');
  const [data, setData] = useState([]);

  const handleGetData = (e) => {
    e.preventDefault();
    // Prepare the API endpoint URL based on the selected options
    const apiUrl = `/view?circle=${circle}&year=${year}&month=${month_of_year}`;

    // Make the API call using axios
    axios
      .get(apiUrl)
      .then((response) => {
        // Handle the response data here
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error); // Log the error if something went wrong
        // Optionally, you can handle the error or notify the user
      });
  };


  return (
    <div>
       <h1 className='makesure'>View Data</h1>
      <div className="choosing">
     
     <div>
     <form>
       <div className='bsbc'>
       <div className='dsdc'>
        <label>
          Circle:
          <input type="text" value={circle} onChange={(e) => setCircle(e.target.value)} />
        </label>
      </div>
      <div className='dsdc'>
        <label>
          Month:
          <input type="text" value={month_of_year} onChange={(e) => setMonth(e.target.value)} />
        </label>
      </div>
        <div className='dsdc'>
        <label>
          Year:
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
      </div>
       </div>
        <button type="submit" className='getMore' onClick={handleGetData}>Get Output</button>
      </form>
     </div>
    </div>
    {data.length > 0 && (
      <div>
        <h2 className='tabledata'>Fetched Data</h2>
        <div className='table-container'>
          <table className='data-table'>
            <thead>
              <tr>
              <th>Circle</th>
              <th>Division</th>
              <th>Sub-Division</th>
                <th>Month</th>
                <th>Year</th>
                <th>Injection</th>
                <th>Unit Billed</th>
                <th>Total IRCA Collection</th>
                <th>Demand IRCA</th>
                <th>No of Consumers</th>
                <th>No of bill Served</th>
                <th>Billing Efficiency</th>
                <th>PC Consumer Billing</th>
                <th>ARR</th>
                <th>Collection Efficiency</th>
                <th>AT&C Losses</th>

                {/* Add more table headers for other data fields */}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.circle}</td>
                  <td>{item.division}</td>
                  <td>{item.subdivision}</td>
                  <td>{item.month_of_year}</td>
                  <td>{item.year}</td>
                  <td>{item.injection}</td>
                  <td>{item.unit_billed} </td>
                  <td>{item.total_IRCA_collection} </td>
                  <td>{item.demand_IRCA} </td>
                  <td>{item.no_of_consumers} </td>
                  <td>{item.no_of_bill_served} </td>
                  <td>{item.subDivisionbilling_efficiency_perMonth} </td>
                  <td>{item.subdivision_monthlyPConsumerBilling} </td>
                  <td>{item.subDivisionAverageRevenueRealisationMonthly} </td>
                  <td>{item.subDivisionCollectionEfficiencyMonthly} </td>
                  <td>{item.ATandC_LossesincludingIRCA} </td>
                  
                  {/* Add more table data cells for other data fields */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
    </div>
  );
};

export default Output;
