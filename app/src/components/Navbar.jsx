import React from 'react'
import styled from "styled-components";
import RlButton from './elementComponent/Button/Button';
const Navbar = () => {
  return <NavBar>
<ul>
<li href="#">Product</li>
<li href="#">Profile</li>
<li href="#">Skin Data FillUp form</li>
<li href="#">Face Scanning Page</li>
<RlButton name="LogIn"/>
<RlButton name="Register"/>
<RlButton name="LogOut"/>
</ul>
  </NavBar>
}
export default Navbar

const NavBar= styled.nav`
background-color: White;
height: 80px;
width: 90%;
border-radius: 20px;
margin:30px auto;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
ul{
  display: flex;
  list-style-type: none;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: center;
}
ul li{
  font-weight: 600;
  font-size: 19px;
  &:hover{
background-color: #86A788;
color: white;
transition: all 0.1s ease-out;
border: 1px transparent solid;
border-radius:10%;
padding: 5px;
transform: translateY(-5px);

  }
}
`;
