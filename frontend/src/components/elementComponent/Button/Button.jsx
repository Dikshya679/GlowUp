import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const RlButton = ({name, link, onClick}) => {
  if (onClick) {
    return <RLButton onClick={onClick}>{name}</RLButton>;
  }

  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <RLButton>{name}</RLButton>
    </Link>
  );
}

export default RlButton;

const RLButton = styled.button`
    background-color: #FFFFFF;
    color: #5D2E46;                        
    border: none;
    padding: 10px 24px; 
    border-radius: 12px;                   
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); 
    font-weight: 600;
    letter-spacing: 0.5px;
    cursor: pointer; 
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.9);
        transform: translateY(-2px);           
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }
`;