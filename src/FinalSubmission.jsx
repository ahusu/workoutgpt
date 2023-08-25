import React, { useState } from 'react';
import axios from 'axios';

const FinalSubmission = ({plan}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async () => {
    try {
        const response = await axios.post('/submission', { name, phoneNumber, plan });

        // Handle the response here if needed
        console.log(response.data); // assuming your server sends back some data

        alert('Submission successful!');
    } catch (error) {
        console.error('Error submitting the data:', error);
        alert('Error during submission. Please try again.');
    }
};


  return (
    <div>
      <div>
        <label>
          What is your name?
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
      </div>

      <div>
        <label>
          What is your phone number so I can text you to help keep you on track to meet your goals?
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
          />
        </label>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FinalSubmission;
