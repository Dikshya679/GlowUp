import styled from 'styled-components';

const SimpleButton = ({name,isSelected,onClick}) => {
  return <Button $isSelected={isSelected} onClick={onClick}>{name}
  </Button>
}

export default SimpleButton

const Button= styled.button`
width: 100px;
height: 40px;
outline: none;
border: none;
border-radius: 10px;
font-weight: 900;
background-color:${({$isSelected})=> ($isSelected? "#1A3C5A":"white")};
color: ${({$isSelected})=> ($isSelected? "white":"#1A3C5A")};
/* border-radius: 15px 40px 15px 10px; */
&:hover{
  background-color: #1A3C5A;
  color:white ;
  border: 1px solid black;
  transition: all 0.2s ease-out;
  transform: translateY(-5px);
}
`;
