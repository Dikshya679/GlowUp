import React from "react";
import styled from "styled-components";
import { FiEdit2, FiChevronRight } from "react-icons/fi";
import { MdOutlineMedicalServices } from "react-icons/md";

const SkinDataForm = () => {
  return (
    <SkinDataform>
      <Card>
        {/* Profile */}
        <Profile>
          <Avatar>
            <img src="https://i.pinimg.com/originals/36/fa/71/36fa711939d05bb0817fb3872e93918f.jpg" alt="profile" />
            <EditBtn>
              <FiEdit2 size={12} /> Edit
            </EditBtn>
          </Avatar>

          <h2>Sarah Jenkins</h2>
          <p>Sarah.j@example.com</p>
        </Profile>

        {/* Skin Info */}
        <Grid>
          <InfoCard>
            <span>Skin Tone</span>
            <strong>
              <Dot /> None
            </strong>
          </InfoCard>

          <InfoCard>
            <span>Skin Type</span>
            <strong>Oily</strong>
          </InfoCard>
        </Grid>

        {/* Primary Concern */}
        <ConcernCard>
          <div>
            <span>Primary Concern</span>
            <h4>Acne Control</h4>
          </div>
          <Pulse />
        </ConcernCard>

        {/* Skin Form */}
        <FormRow>
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

        {/* CTA */}
        <CTA>Start Skin Analysis</CTA>

        {/* Sign out */}
        <SignOut>Sign Out</SignOut>
      </Card>
    </SkinDataform>
  );
};

export default SkinDataForm;

const SkinDataform = styled.main`
  min-height: 80vh;
  display: grid;
  place-items: center;
`;

const Card = styled.section`
  width: 360px;
  background: #fff;
  border-radius: 24px;
  padding: 28px 22px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
`;

const Profile = styled.div`
  text-align: center;

  h2 {
    margin-top: 12px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    color: #7a7a7a;
  }
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

  span {
    font-size: 11px;
    text-transform: uppercase;
    color: #8a8a8a;
  }

  strong {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 6px;
    font-weight: 500;
  }
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e6b99d;
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

  span {
    font-size: 11px;
    color: #8a8a8a;
  }

  h4 {
    margin-top: 6px;
    font-weight: 500;
  }
`;

const Pulse = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #33815b;
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

  .left {
    display: flex;
    gap: 10px;
    align-items: center;

    svg {
      font-size: 22px;
      color: #5f8572;
    }
  }

  h5 {
    margin: 0;
    font-size: 14px;
  }

  p {
    font-size: 12px;
    color: #7a7a7a;
  }
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
`;

const SignOut = styled.p`
  margin-top: 14px;
  text-align: center;
  font-size: 13px;
  color: #e35b5b;
  cursor: pointer;
`;