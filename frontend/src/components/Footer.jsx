import React from "react";
import styled from "styled-components";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="FooterTopContainer">
        <div className="companyTag">
          <img src="" alt="" />
          <span className="companyAddress">
            Lamachaur-19, Pokhara, Kaski,Nepal
          </span>
        </div>
        <div className="quickLinks">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="">Product</a>
            </li>
            <li>
              <a href="">Profile</a>
            </li>
            <li>
              <a href="">Skin Data FillUp form</a>
            </li>
            <li>
              <a href="">Face Scanning Page</a>
            </li>
          </ul>
        </div>
        <div className="socialMedia">
          <div className="subscribe">
            <input type="email" placeholder="Enter Your Email" />
            <button>Subscribe</button>
          </div>
          <div className="socialMediaLinks">
            <h2>Connect with us</h2>
            <ul>
              <li>
                <a href="" style={{ color: "blue" }}>
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a href="" style={{ color: "#0a66c2" }}>
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a href="">
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a href="">
                  <MdEmail />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="copyright">© 2024 GlowUp Pvt. Ltd.</div>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.section`
  background-color: white;
  height: 250px;
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 20px;

  .FooterTopContainer {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
  .companyTag {
    /* border:  1px solid #86A788; */
    height: 200px;
    min-width: 300px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 140px;
      border: 1px solid black;
      height: 130px;
    }
    .companyAddress {
      width: 100%;
      height: 50px;
      position: absolute;
      bottom: 10px;
      text-align: center;
      color: #86a788;
      font-size: 18px;
    }
  }

  .quickLinks {
    /* border:  1px solid #86A788; */
    height: 230px;
    min-width: 500px;
    padding: 20px 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    color: #86a788;
    ul {
      list-style-type: none;
    }
    ul li {
      margin-top: 10px;
    }
  }
  .socialMedia {
    /* border: 1px solid #86a788; */
    height: 230px;
    min-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #86a788;
   
  }
   .socialMediaLinks {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      gap: 20px;
   
    }
     .socialMediaLinks ul {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 20px;
        list-style-type: none;
      }
      .socialMediaLinks ul a{
font-size: 30px;
      }
  .subscribe {
    width: fit-content;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #86a788;
    border-radius: 40px;
  }
  .subscribe input {
    width: 270px;
    height: 35px;
    padding: 20px;
    font-size: 20px;
    border: none;
    border-radius: inherit;
  }
  .subscribe button {
    width: 120px;
    height: inherit;
    border: none;
    background-color: #86a788;
    color: white;
    font-size: 17px;
    border-radius: inherit;
  }

  .subscribe input::placeholder {
    font-size: 18px;
  }
  .copyright {
    color: #86a788;
    position: absolute;
    bottom: 10px;
  }
`;
