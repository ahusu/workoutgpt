import React, { useState } from "react";
import axios from "axios";

const FinalSubmission = ({ plan }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(null);

  const handleSubmit = async () => {
    if (isValidPhoneNumber(phoneNumber)) {
      try {
        setValid(true);
        const response = await axios.post("/submission", {
          name,
          phoneNumber,
          plan,
        });

        alert("Submission successful!");
        //TODO OTHER LOGIC AFTER SUBMISSION
      } catch (error) {
        console.error("Error submitting the data:", error);
        alert("Error during submission. Please try again.");
      }
    }
  };

  function isValidPhoneNumber(phone) {
    // This pattern matches numbers like: 1234567890, 123-456-7890, (123) 456-7890, and +31636363634
    const pattern =
      /^(\+\d{1,2}\s?)?((\(\d{1,4}\))|\d{1,4})[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/;
    return pattern.test(phone);
  }

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
          What is your phone number so I can text you to help keep you on track
          to meet your goals?
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
