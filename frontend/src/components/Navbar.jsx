import React, { useState } from 'react'
import styled from "styled-components";
import RlButton from './elementComponent/Button/Button';
import {Link, useNavigate } from "react-router-dom";
import useFetch from '../hooks/useFetch.js'


const Navbar = () => {
const url ="http://127.0.0.1:8000/api/logout/"
const {fetchData} = useFetch(url);
const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(() => {
  return localStorage.getItem("isLoggedIn") === "true";
});

const logout= async ()=>
{
  if(loginStatus){
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
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
 setLoginStatus(false)
navigate("/login");
}

  }
}

  return <NavBar>
    
<ul>
<li><Link to="/product">Product</Link></li>
  <li><Link to="/profile">Profile</Link></li>
  <li><Link to="/datafillUp">Skin Data form</Link></li>
  <li><Link to="/faceScanPage">Face Scan</Link></li>
  <li><Link to="/Searchproducts">SearchResults</Link></li>
{!loginStatus && <RlButton name="LogIn" link="/login"/>}
{ !loginStatus  && <RlButton name="Register" link="/register"/>}
{loginStatus && <RlButton name="LogOut" onClick={logout}/>}
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
  cursor: pointer;
  &:hover{
background-color: #86A788;
color: white;
transition: all 0.05s ease-in-out;
border-radius:10%;
padding: 5px;
transform: translateY(-5px);

  }
a{
  text-decoration: none;
  color: inherit;

}
}

`;
