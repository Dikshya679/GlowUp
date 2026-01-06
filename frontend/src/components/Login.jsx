import React, {useState} from "react";
import styled from "styled-components";
import useFetch from '../hooks/useFetch'
import { useNavigate } from "react-router-dom";
const Login = () => {
  const url ="http://127.0.0.1:8000/api/login/"
  const {error , loading, fetchData} = useFetch(url)
  const [formData , setFormData] = useState({
    'emailOrUsername' : "",
    "password": "",
  })
 const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  if(error){
    alert(error)
  }
const handleChange=(e)=>
{
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
}

const handleSubmit =async (e)=>
{
  e.preventDefault();


  const options ={
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      emailOrUsername: formData.emailOrUsername,
      password: formData.password
    })
  }
const result = await fetchData(options);

      if (result.message) {
        setSuccessMessage(result.message);
        setFormData({
          emailOrUsername: "",
          password: "",
        });
        localStorage.setItem("isLoggedIn" , true);
        navigate('/')
      } else {
        setErrorMessage(result.error || "login failed.");
      }
}


  return (
    <Container>
      <FormWrapper>
        <Title>GlowUp</Title>
        <Subtitle>Login to your account</Subtitle>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        {successMessage && <SuccessText>{successMessage}</SuccessText>}
        <Form onSubmit={handleSubmit}>
          <Input type="text" placeholder="Email or username" name="emailOrUsername" onChange={handleChange} value={formData.emailOrUsername}/>
          <Input type="password" placeholder="Password" onChange={handleChange} name="password" value={formData.password}/>
          <Button type="submit" disabled={loading}>{loading ? 'Logging': 'Login'}</Button>
        </Form>
        <Forgot>
          Forgot your password? <Link href="/register">Reset</Link>
        </Forgot>
      </FormWrapper>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  background-color: #86A788;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const FormWrapper = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  width: 350px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 8px;
  color: #2E3A23;
`;

const Subtitle = styled.p`
  margin-bottom: 24px;
  font-size: 14px;
  color: #4F6254;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #2E3A23;
    box-shadow: 0 0 5px rgba(46, 58, 35, 0.3);
  }
`;

const Button = styled.button`
  padding: 12px;
  border-radius: 8px;
  border: none;
  background-color: #2E3A23;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #445134;
  }
`;

const Forgot = styled.p`
  margin-top: 16px;
  font-size: 13px;
  color: #4F6254;
`;

const Link = styled.a`
  color: #2E3A23;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.p`
  color: #d32f2f;
  margin-bottom: 16px;
  font-size: 14px;
`;

const SuccessText = styled.p`
  color: #388e3c;
  margin-bottom: 16px;
  font-size: 14px;
`;

export default Login;
