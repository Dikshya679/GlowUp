import React from 'react'
import styled from 'styled-components'
import RlButton from './elementComponent/Button/Button'
import SimpleButton from './elementComponent/Button/simpleButton';


const ProductPage = () => {

const filterButtons=[
  {
    name: "Cleansers",
    type:"Cleansers",
  },
  {
    name: "Exfoliators",
    type:"Exfoliators",
  },
  {
    name: "Toners",
    type:"Toners",
  },
  {
    name: "Serums",
    type:"Serums",
  },
  {
    name: "Moisturizers",
    type:"Moisturizers",
  },
  {
    name: "Sunscreens",
    type:"Sunscreens",
  },
  {
  name: "Masks",
  type:"Masks",
  },
  {
  name: "Facial_oils",
  type:"Facial_oils",
  },
 
];

const recommendedProduct = {
  image: "https://www.healme.com.np/storage/Product/PR-1752698318-5852174.webp",
  name: "Hydrating Cleanser",
  type: "Cleanser",
  benefit: "Gentle, non-drying",
  skinType: "Dry skin",
  price: "$12"
};



  return <MainContainer>
<div className="headBar">
<div className="filterContainer">
{filterButtons.map((productType)=>(
  <SimpleButton name={productType.type} key={productType.name}/>
))

}
</div>
<div className="searchBar">
  <input type="text" placeholder="Search here..." />
 <SimpleButton name="Search"/>
</div>
  </div>
<div className="RecommendedProducts">
 <Card>
      <ImageWrapper>
        <img src={recommendedProduct.image} alt={name} />
      </ImageWrapper>

      <Info>
        <h4>{recommendedProduct.name}</h4>
        <span className="type">{recommendedProduct.type}</span>

        <p className="benefit">{recommendedProduct.benefit}</p>

        <div className="footer">
          <span className="skin">{recommendedProduct.skinType}</span>
          <span className="price">{recommendedProduct.price}</span>
        </div>
      </Info>
    </Card>
</div>
<h1>Products</h1>
<div className="products">

</div>
  </MainContainer>
}

export default ProductPage
const MainContainer= styled.main`
.headBar{
width:100%;
height: 130px;
display: flex;
flex-direction: row;
gap: 10px;
align-items: center;
background: rgba(255, 255, 255, 0.65);
backdrop-filter: blur(10px);
padding: 20px;
}
.filterContainer{
  width: 100%;
  height: inherit;
  padding: 10px 20px;
display: flex;
flex-direction: row;
align-items: center;
gap: 20px;
overflow-x:auto;
flex-wrap: nowrap;
scroll-behavior: smooth; 
scroll-snap-type: x mandatory;
}
.searchBar{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
  gap: 10px;
input{
  width: 200px;
  height: 40px;
  border: none;
  padding: 10px;

  &::placeholder{
    font-size: 17px;
  }


}

}

.RecommendedProducts{
  padding: 40px;
  overflow-x:auto;
flex-wrap: nowrap;
scroll-behavior: smooth; 
scroll-snap-type: x mandatory;
width: 100%;
}
`;



const Card = styled.div`
  width: 180px;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  flex: 0 0 auto;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 140px;
  background: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  padding: 12px;

  h4 {
    font-size: 14px;
    margin: 0;
    line-height: 1.2;
  }

  .type {
    font-size: 11px;
    color: #777;
  }

  .benefit {
    font-size: 12px;
    margin: 6px 0;
    color: #444;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-top: 8px;
  }

  .skin {
    color: #2b7a78;
  }

  .price {
    font-weight: 600;
  }
`;
