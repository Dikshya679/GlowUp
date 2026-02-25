import React, {  useRef } from "react";
import styled from "styled-components";
import { FiEdit2, FiChevronRight } from "react-icons/fi";
import { MdOutlineMedicalServices } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const ProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
const { 
  email, 
  profilePic, 
  skin_type, 
  skin_tone, 
  skin_concerns, 
  setUserData
} = useUserStore();
  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); 
    formData.append("email", email); 

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload-profile-pic/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
console.log(data)
      if (response.ok && data.image_url) {
        // setImage(data.image_url);
        setUserData({ profilePic: data.image_url });
        localStorage.setItem("profilePic", data.image_url); 
        alert("Yay! Profile picture updated.");
        window.location.reload();
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Could not connect to the server.");
    }
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <SkinDataform>
      <Card>
        <Profile>
          <Avatar>
            {profilePic ? (
              <img src={profilePic} alt="profile" />
            ) : (
              <FaUserCircle size={110} color="#E0F2F1" />
            )}

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
            />

            <EditBtn onClick={handleEditClick}>
              <FiEdit2 size={12} /> Edit
            </EditBtn>
          </Avatar>

          <p>{email}</p>
        </Profile>

        <Grid>
          <InfoCard>
            <span>Skin Tone</span>
            <strong>
             {skin_tone ? skin_tone : "None"}
            </strong>
          </InfoCard>

          <InfoCard>
            <span>Skin Type</span>
            <strong>{skin_type ? skin_type : "None"}</strong>
          </InfoCard>
        </Grid>

        <ConcernCard>
          <div>
            <span>Primary Concern</span><br />
              <strong>{skin_concerns ? skin_concerns : "None"}</strong>
          </div>
          <Pulse />
        </ConcernCard>

        <FormRow onClick={() => navigate("/datafillUp")}>
          <div className="left">
            <MdOutlineMedicalServices />
            <div>
              <h5>Skin Form Fillup</h5>
              <p>Update your details</p>
            </div>
          </div>
          <FiChevronRight />
        </FormRow>

        <Divider>OR</Divider>

        <CTA onClick={() => navigate("/faceScanPage")}>Start Skin Analysis</CTA>

        <SignOut onClick={handleSignOut}>Sign Out</SignOut>
      </Card>
    </SkinDataform>
  );
};

export default ProfilePage;

// --- STYLED COMPONENTS (Design preserved) ---

const SkinDataform = styled.main`
  min-height: 80vh;
  display: grid;
  place-items: center;
  padding: 20px;
`;

const Card = styled.section`
  width: 100%;
  max-width: 360px;
  background: #fff;
  border-radius: 24px;
  padding: 28px 22px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
`;

const Profile = styled.div`
  text-align: center;
  h2 { margin-top: 12px; font-weight: 600; color: #333; }
  p { font-size: 14px; color: #7a7a7a; }
`;

const Avatar = styled.div`
  position: relative;
  width: 110px;
  margin: auto;
  img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #FAD0C4;
  }
`;

const EditBtn = styled.button`
  position: absolute;
  bottom: 6px;
  right: 6px;
  background: #5f8572;
  color: #fff;
  border: none;
  padding: 4px 10px;
  font-size: 11px;
  border-radius: 14px;
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
  transition: 0.3s;
  &:hover { background: #4a6b5a; transform: scale(1.05); }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 24px;
`;

const InfoCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 14px;
  border: 1px solid #eee;
  span { font-size: 11px; text-transform: uppercase; color: #8a8a8a; }
  strong { display: flex; align-items: center; gap: 6px; margin-top: 6px; font-weight: 500; }
`;


const ConcernCard = styled.div`
  margin-top: 16px;
  padding: 16px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span { font-size: 11px; color: #8a8a8a; }
  h4 { margin-top: 6px; font-weight: 500; }
`;

const Pulse = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #B9E5FB;
`;

const FormRow = styled.div`
  margin-top: 18px;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: 0.2s;
  &:hover { background: #f9f9f9; }
  .left { display: flex; gap: 10px; align-items: center;
    svg { font-size: 22px; color: #5f8572; }
  }
  h5 { margin: 0; font-size: 14px; }
  p { font-size: 12px; color: #7a7a7a; }
`;

const Divider = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 12px;
  color: #aaa;
`;

const CTA = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 16px;
  border: none;
  background: #5f8572;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  font-weight: 600;
  &:hover { background: #4a6b5a; }
`;

const SignOut = styled.p`
  margin-top: 14px;
  text-align: center;
  font-size: 13px;
  color: #e35b5b;
  cursor: pointer;
  font-weight: 600;
  &:hover { text-decoration: underline; }
`;