import React from 'react';
import styled from 'styled-components';
import RlButton from './Button/Button';

const ProductCard = ({ product }) => {
  // console.log(product)
  return (
    <Card>
      <ImageWrapper>
        <img src={product.picture_src} alt={product.product_name} />
      </ImageWrapper>

      <Info>
        <h4>{product.product_name}</h4>
        <span className="type">{product.product_type}</span>
        <span className="brand">{product.brand}</span>


       <p className="skinType">
  <b>Suitable for: </b> 
  {String(product.skin_type || "")
 .replace(/[[]']/g, '')
    .split(',')
    .map(item => item.trim()) 
    .join(', ')               
  }
</p>

        <div className="footer">
          <span className="rating">⭐ {product.rating}</span>
          <span className="price">{product.price}</span>
        </div>

      </Info>
      <div className='addToCart'>
<RlButton name="Add to Cart"/>
      </div>
    </Card>
  );
};


export default ProductCard;


const Card = styled.div`
  width: 310px;
  height: 430px;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  flex: 0 0 auto;
  margin: 10px;
  padding: 14px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .addToCart{
    position: absolute;
    bottom: 20px;
   
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  padding: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: scale(1.2);
  }
`;

const Info = styled.div`
  padding: 12px;

  h4 {
    font-size: 16px;
    margin: 0;
    line-height: 1.2;
  }

  .type, .brand {
    font-size: 12px;
    color: #777;
    display: block;
  }

  .benefit, .skinType, .description {
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

  .rating {
    color: #f4c150;
  }

  .price {
    font-weight: 600;
  }
`;
