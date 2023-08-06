import React, { useState } from 'react';
import '../SimpleForm.css';
import SubmissionContent from './SubmissionContent';

const SimpleForm = () => {
  const [formData, setFormData] = useState({
    circle: '',
    division: '',
    subdivision:'',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset isSubmitted to false when form values change
    setIsSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="container">
      
         <form onSubmit={handleSubmit}>
      <div>
      <h1 className="header">APDCL Form</h1>
        <label htmlFor="circle">Circle:</label>
        <select
          type="text"
          id="circle"
          name="circle"
          value={formData.circle}
          onChange={handleChange}
        >
          <option value="">Select Circle</option>
            <option value="GEC-1">GEC-1</option>
            <option value="GEC-2">GEC-2</option>
            <option value="Rangia">Rangia</option>
            <option value="Mangaldoi">Mangaldoi</option>
            <option value="Bongaigaon">Bongaigaon</option>
            <option value="Kokrajhar">Kokrajhar</option>
            <option value="Barpeta">Barpeta</option>
            <option value="Nagaon">Nagaon</option>
            <option value="Morigaon">Morigaon</option>
            <option value="KANCH">KANCH</option>
            <option value="Tezpur">Tezpur</option>
            <option value="North Lakhimpur">North Lakhimpur</option>
            <option value="Cachar">Cachar</option>
            <option value="Badarpur">Badarpur</option>
            <option value="Jorhat">Jorhat</option>
            <option value="Golaghat">Golaghat</option>
            <option value="Sivasagar">Sivasagar</option>
            <option value="Dibrugarh">Dibrugarh</option>
            <option value="Tinsukia">Tinsukia</option>
            
          </select>
      </div>
      <div>
        <label htmlFor="division">Division:</label>
        <input
          type="division"
          id="division"
          name="division"
          value={formData.division}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="subdivision">Sub-Division:</label>
        <input
          type="subdivision"
          id="subdivision"
          name="subdivision"
          value={formData.subdivision}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className='addMore'>Next</button>
    </form>
    {isSubmitted && (
       <div className="submission-result">
        <SubmissionContent
          circle={formData.circle}
          division={formData.division}
          subdivision={formData.subdivision}
        />
        </div>
      )}
    </div>
  );
};
export default SimpleForm;


