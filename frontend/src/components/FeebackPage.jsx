import React from 'react';
import styled from 'styled-components';

const FeedbackPage = () => {
  return (
    <FeedbackContainer>
      <form className="form-container" action="/server" method="post">
      <h2>Feedback Form</h2>
      <label htmlFor="username">Name</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Enter your name"
        required
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="emailId"
        placeholder="Enter your email"
        required
      />

      <label htmlFor="message">Feedback</label>
      <textarea
        id="message"
        name="message"
        rows="4"
        placeholder="Write your feedback here..."
        required
      ></textarea>

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
