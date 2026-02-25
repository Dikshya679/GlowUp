import React, { useState } from 'react';
import { styled } from 'styled-components';
// import { useNavigate } from "react-router-dom";


const FaceScanningPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleStartAnalysis = async (e) => {
    e.preventDefault(); 

    if (!selectedImage) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);

  
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    
    reader.onloadend = async () => {
      const base64data = reader.result;

   try {

  const response = await fetch('http://127.0.0.1:8000/skintoneAnalysis/upload', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file: base64data }),
  });

  const data = await response.json();
    if (data.tone_name) {
    const userEmail = localStorage.getItem("userEmail"); 

    const updateResponse = await fetch('http://127.0.0.1:8000/skintoneAnalysis/skintoneupdate/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        skin_tone: data.tone_name 
      }),
    });

    
    if (updateResponse.ok) {
      alert(`Success! Analysis complete. Your tone is ${data.tone_name}`);
    }
  setSelectedImage(null); 
  setLoading(false);
  }

} catch (error) {
  console.error("Error:", error);
  alert("Failed to complete analysis or save data.");
} finally {
        setLoading(false);
      }
    };
  };

  return (
    <FaceScanContainer>
      <div className="content">
        <div className="badge">🌿 Skin Data Form</div>

        <h1>
          Face Scan<br />
          <span>AI-Powered Analysis</span>
        </h1>

        <p className="description">
          Unlock your personalized skincare routine. Our advanced AI scans your
          skin to identify unique needs and recommend the perfect regimen tailored
          just for you.
        </p>

        <div className="upload-section">
          <form onSubmit={handleStartAnalysis}>
            <label htmlFor="file-upload" className="custom-file-upload">
              {selectedImage ? "✅ Image Selected" : "📷 Choose Skin Photo"}
            </label>
            <input 
              id="file-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              style={{ display: 'none' }} 
            />
            
            <div className="buttons">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Analyzing..." : "Start Analysis →"}
              </button>
              <button type="button" className="btn-secondary">Learn More</button>
            </div>
          </form>
        </div>
      </div>

      <div className="scan-card">
        <img
          src={selectedImage ? URL.createObjectURL(selectedImage) : "https://i.imgur.com/3s6XQpE.png"}
          alt="AI Face Scan"
          className="scan-image"
          style={{ borderRadius: '15px' }}
        />

        <div className="status">
          <div>
            <small>STATUS</small>
            <p>{selectedImage ? "Image Uploaded" : "Ready to Scan"}</p>
          </div>
          <div className="status-icon">😊</div>
        </div>
      </div>
    </FaceScanContainer>
  );
};

export default FaceScanningPage;

const FaceScanContainer = styled.main`
    width: 90%;
    display: flex;
    align-items: center;
    background: #f9fbf8;
    color:#1f2d23 ;
    justify-content: center;
    margin: auto;
    border-radius: 20px;
    height:600px;
    padding: 30px;
    gap: 40px;

    .content {
      max-width: 480px;
    }

    .custom-file-upload {
      display: inline-block;
      padding: 10px 20px;
      cursor: pointer;
      background: #edf3ee;
      border: 1px dashed #5f8466;
      border-radius: 10px;
      margin-bottom: 20px;
      font-size: 14px;
      color: #5f8466;
      font-weight: 500;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #edf3ee;
      color: #5f8466;
      padding: 7px 16px;
      border-radius: 30px;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 28px;
    }

    h1 {
      font-size: 46px;
      font-weight: 600;
      line-height: 1.15;
      margin-bottom: 18px;
    }

    h1 span {
      font-weight: 400;
      color: #6c7a71;
      font-size: 36px;
    }

    .description {
      font-size: 16px;
      color: #6c7a71;
      line-height: 1.65;
      margin-bottom: 38px;
    }

    .buttons {
      display: flex;
      gap: 18px;
    }

    .btn-primary {
      background: #5f8466;
      color: #fff;
      border: none;
      padding: 15px 28px;
      border-radius: 30px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .btn-primary:hover:not(:disabled) {
      background: #4c6e57;
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: transparent;
      border: 1px solid  #e5ece7;
      padding: 15px 28px;
      border-radius: 30px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      color: #1f2d23;
      transition: all 0.3s ease;
    }

    .btn-secondary:hover {
      background: #f1f6f2;
    }

    .scan-card {
      width: 400px;
      background: #ffffff;
      border-radius: 26px;
      padding: 32px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
    }

    .scan-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      display: block;
      opacity: 0.95;
    }

    .status {
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid  #e5ece7;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .status small {
      font-size: 11px;
      letter-spacing: 1px;
      color: #6c7a71;
    }

    .status p {
      font-size: 14px;
      font-weight: 500;
      margin-top: 4px;
    }

    .status-icon {
      background: #edf3ee;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }

    @media (max-width: 900px) {
      height: auto;
      flex-direction: column;
      padding: 50px 20px;

      .content {
        text-align: center;
        max-width: 100%;
      }

      .buttons {
        justify-content: center;
      }

      h1 {
        font-size: 38px;
      }

      .scan-card {
        width: 100%;
        max-width: 400px;
      }
    }
`;