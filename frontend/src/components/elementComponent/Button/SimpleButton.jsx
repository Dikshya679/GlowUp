import styled from 'styled-components';

const SimpleButton = ({name}) => {
  return <Button>{name}
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
background-color:white ;
color: #86A788;
/* border-radius: 15px 40px 15px 10px; */
&:hover{
  background-color: #86A788;
  color:white ;
  border: 1px solid black;
  transition: all 0.2s ease-out;
  transform: translateY(-5px);
}
`;
