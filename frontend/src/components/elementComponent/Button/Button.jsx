import styled from 'styled-components';

const RlButton = ({name,link,onClick}) => {
  return <a href={link}>
    <RLButton onClick={onClick}>{name} 
  </RLButton>
  </a>
}

export default RlButton

const RLButton= styled.button`
width: 150px;
height: 40px;
outline: none;
border: none;
border-radius: 10px;
font-weight: 900;
background-color:#86A788 ;
&:hover{
  background-color: white;
  color:#86A788 ;
  border: 1px solid black;
  transition: all 0.2s ease-out;
  transform: translateY(-5px);
}
`;
