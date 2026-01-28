import React from 'react';
import { styled } from 'styled-components';
import { useState } from "react";

const SkinDataForm = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <SkinDataform>
     <div className="skin-form-page">
      <div className="skin-form-container">
        <h1>What is your skin type?</h1>
        <p className="subtitle">Select all that apply.</p>

        <div className="grid">
          {["Normal", "Dry", "Oily", "Combination", "Sensitive"].map((t) => (
            <label key={t}>
              <input type="checkbox" />
              <div className="card">{t}</div>
            </label>
          ))}
        </div>

        <h2 style={{ marginTop: 40 }}>Primary Concerns</h2>

        <div className="pills">
          {["Moisturizing", "Soothing", "Pore Care", "Acne Spot"].map((c) => (
            <label key={c}>
              <input type="checkbox" />
              <div className="pill">{c}</div>
            </label>
          ))}

          <div
            className="pill more-pill"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "– Less" : "+ More"}
          </div>
        </div>

        {showMore && (
          <div className="pills">
            {["Pigmentation", "Redness", "Fine Lines", "Dullness"].map((c) => (
              <label key={c}>
                <input type="checkbox" />
                <div className="pill">{c}</div>
              </label>
            ))}
          </div>
        )}

        <button>Update Info</button>
      </div>
    </div>
    
    </SkinDataform>
   
  );
};

export default SkinDataForm;
const SkinDataform= styled.main`
 .skin-form-page {
          padding: 60px 20px;   /* spacing under navbar */
          width: 100%;
        }

        .skin-form-container {
          max-width: 900px;
          margin: 0 auto;      /* center horizontally only */
          background: white;
          padding: 40px;
          border-radius: 24px;
        }

        h1 {
          font-size: 28px;
          margin-bottom: 8px;
        }

        .subtitle {
          color: #6b7280;
          margin-bottom: 32px;
        }

        input[type="checkbox"] {
          display: none;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .card {
          border: 1.5px solid #e4e7e3;
          border-radius: 16px;
          padding: 18px;
          cursor: pointer;
          background: #fff;
        }

        input:checked + .card {
          background: #3f6b57;
          color: white;
        }

        .pills {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 20px;
        }

        .pill {
          border: 1.5px solid #e4e7e3;
          padding: 10px 18px;
          border-radius: 999px;
          cursor: pointer;
          background: #fff;
        }

        input:checked + .pill {
          background: #3f6b57;
          color: white;
        }

        .more-pill {
          background: #f0f4f2;
          font-weight: 600;
        }

        button {
          width: 100%;
          margin-top: 40px;
          padding: 18px;
          border: none;
          border-radius: 999px;
          background: #3f6b57;
          color: white;
          font-size: 18px;
        }
`;