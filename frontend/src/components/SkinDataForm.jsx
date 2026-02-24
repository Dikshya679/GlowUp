import React, { useState } from 'react';
import { styled } from 'styled-components';

const SkinDataForm = () => {
  const [showMore, setShowMore] = useState(false);
  
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
  const [selectedConcerns, setSelectedConcerns] = useState([]);

  const handleToggle = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item)); 
    } else {
      setList([...list, item]); 
    }
  };

  
  const handleUpdate = async () => {
    const userEmail = localStorage.getItem("userEmail"); 
    const UserSkinData = {
      email: userEmail,
      skin_type: selectedSkinTypes.join(", "), 
      skin_concerns: selectedConcerns.join(", ")
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/update-skin/', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(UserSkinData),
      });

      if (response.ok) {
        alert("Skin info Updated Successfully!");
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SkinDataform>
      <div className="skin-form-container">
        <h1>What is your skin type?</h1>
        <div className="grid">
          {["Normal", "Dry", "Oily", "Combination", "Sensitive"].map((t) => (
            <label key={t}>
              <input 
                type="checkbox" 
                onChange={() => handleToggle(t, selectedSkinTypes, setSelectedSkinTypes)}
              />
              <div className="card">{t}</div>
            </label>
          ))}
        </div>

        <h2 style={{ marginTop: 40 }}>Primary Concerns</h2>
        <div className="pills">
          {["Moisturizing", "Soothing", "Pore Care", "Acne Spot"].map((c) => (
            <label key={c}>
              <input 
                type="checkbox" 
                onChange={() => handleToggle(c, selectedConcerns, setSelectedConcerns)}
              />
              <div className="pill">{c}</div>
            </label>
          ))}
          <div className="pill more-pill" onClick={() => setShowMore(!showMore)}>
            {showMore ? "– Less" : "+ More"}
          </div>
        </div>


        <button onClick={handleUpdate}>Update Info</button>
      </div>
    </SkinDataform>
  );
};
export default SkinDataForm;
const SkinDataform= styled.main`
 .skin-form-page {
          padding: 60px 20px;   
          width: 100%;
        }

        .skin-form-container {
          max-width: 900px;
          margin: 0 auto;      
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