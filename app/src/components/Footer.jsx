import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return <FooterContainer>
  <div className="FooterTopContainer">
<div className="companyTag">

</div>
<div className="companyNavigations">

</div>
<div className="socialMedia">

</div>
  </div>


  <div className="copyright">
© 2024 GlowUp Pvt. Ltd.
  </div>
  </FooterContainer>
}

export default Footer

const FooterContainer= styled.section`
background-color: white;
height: 250px;
width:100%;
position: absolute;
bottom: 0;
padding: 20px;

.FooterTopContainer{
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.companyTag{

}

.companyNavigations{


}
.socialMedia{

  
}
.copyright{
  color: #86A788;
  position: absolute;
  bottom: 10px;
}
`;