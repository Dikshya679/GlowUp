import React from 'react'
import styled from "styled-components";
import RlButton from './elementComponent/Button/Button';
import { useNavigate } from "react-router-dom";
import useFetch from '../hooks/useFetch.js'
const Navbar = () => {
const url ="http://127.0.0.1:8000/api/logout/"
const {fetchData} = useFetch(url);
const navigate = useNavigate();


const logout= async ()=>
{
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if(isLoggedIn === "true"){
const options = {
  method: "POST",
  headers:{
    'Content-Type': "application/json"
  },
  credentials: "include"
}
const result = await fetchData(options);
if(result.message)
{
 localStorage.removeItem("isLoggedIn",'email',"username");
navigate("/register");
}

  }
}

  return <NavBar>
    
<ul>
<li href="#">Product</li>
<li href="#">Profile</li>
<li href="#">Skin Data FillUp form</li>
<li href="#">Face Scanning Page</li>
<RlButton name="LogIn" link="/login"/>
<RlButton name="Register" link="/register"/>
<RlButton name="LogOut" onClick={logout}/>
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
