import React, { useState } from "react";
import styled from "styled-components";
import useFetch from '../hooks/useFetch';

const Register = () => {
  const url = "http://127.0.0.1:8000/api/register/";
  const { error, loading, fetchData } = useFetch(url);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  // State to hold form errors
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Effect to catch errors from the fetch hook
    if (error) {
      setErrorMessage(error);
    }

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    if (formData.password !== formData.confirm_password) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password
        })
      };

      const result = await fetchData(options);

      if (result.message) {
        setSuccessMessage("Registration successful!");
        setFormData({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          password: "",
          confirm_password: ""
        });
      } else {
        setErrorMessage(result.error || "Registration failed.");
      }
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong.");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>GlowUp</Title>
        <Subtitle>Register to get started</Subtitle>

        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        {successMessage && <SuccessText>{successMessage}</SuccessText>}

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="First Name"
            name="first_name"
            onChange={handleChange}
            value={formData.first_name}
          />
          <Input
            type="text"
            placeholder="Last Name"
            name="last_name"
            onChange={handleChange}
            value={formData.last_name}
          />
          <Input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            value={formData.username}
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            onChange={handleChange}
            value={formData.confirm_password}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </Form>

        <FooterText>
          Already have an account? <Link href="/login">Login</Link>
        </FooterText>
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
  width: 400px;
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

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
`;

const FooterText = styled.p`
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

export default Register;
