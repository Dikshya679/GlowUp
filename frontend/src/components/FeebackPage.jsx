import React, { useState } from 'react';
import styled from 'styled-components';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    emailId: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED");
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/feedback/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const text = await response.text();
        console.error("Backend error:", text);
        alert("Server error. Check backend URL.");
        return;
      }
  
      const data = await response.json();
      console.log(data);
  
      alert("Feedback submitted successfully!");
  
      setFormData({
        username: '',
        emailId: '',
        message: ''
      });
  
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  
  return (
    <FeedbackContainer>
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Feedback Form</h2>

        <label>Name</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="emailId"
          value={formData.emailId}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label>Feedback</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          placeholder="Write your feedback here..."
          required
        />

        <button type="submit">Submit Feedback</button>
      </form>
    </FeedbackContainer>

  );
};


export default FeedbackPage;

const FeedbackContainer = styled.main`
display: flex;
flex-direction: column;
margin-top:90px;
align-items: center;
      .form-container {
            background-color: #f9fbf9;
            width: 100%;
            max-width: 420px;
            padding: 25px 30px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        }

        .form-container h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #2f4f3f;
        }

        label {
            display: block;
            margin-bottom: 6px;
            font-weight: 600;
            color: #333;
        }

        input,
        textarea {
            width: 100%;
            padding: 10px 12px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 14px;
        }

        input:focus,
        textarea:focus {
            outline: none;
            border-color: #3f6f59;
        }

        textarea {
            resize: none;
        }

        button {
            width: 100%;
            padding: 12px;
            background-color: #3f6f59;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: #2f5745;
        }
`;
