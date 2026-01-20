import React, { useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RlButton from "./elementComponent/Button/Button";

// Sample products array
const product = 
  {
    'Unnamed: 0': 0,
    'product_name': 'ACWELL Bubble Free PH Balancing Cleanser',
    'product_type': 'Face Wash',
    'brand': 'ACWELL ',
    'notable_effects': ['Acne-Free', 'Pore-Care', 'Brightening', 'Anti-Aging'],
    'skin_type': ['Oily'],
    'price': 'Rp 209.000',
    'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/ACWELL_BUBBLE_FREE_PH_BALANCING_CLEANSER.jpg',
    'description': "Removes dirt and removes makeup in 1 step, while maintaining the skin's natural pH. Gently cleanses skin without feeling dry and tight. With Centella, Aloe and Witch Hazel extracts which moisturize and soothe, and salicylic acid helps prevent acne. -No harmful chemicals, parabens, artificial dyes, mineral oil, sulfates. -Suitable for all skin types",
    'rating': 4.3
  };

  // ... add other products


const ProductDetailPage = () => {
  
  const navigate = useNavigate();
  const imgRef = useRef(null);


  // Cursor-follow zoom
  const handleMouseMove = (e) => {
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    img.style.transform = "scale(1.5)";
  };

  const handleMouseLeave = () => {
    const img = imgRef.current;
    img.style.transform = "scale(1)";
    img.style.transformOrigin = "center center";
  };

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>← Back to Products</BackButton>
      <Content>
        <ImageWrapper
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img ref={imgRef} src={product.picture_src} alt={product.product_name} />
        </ImageWrapper>
        <Info>
          <h1>{product.product_name}</h1>
          <span className="brand">{product.brand}</span>
          <span className="type">{product.product_type}</span>

          <div className="effects">
            <b>Effects:</b> {product.notable_effects.map((e, i) => (
              <EffectTag key={i}>{e}</EffectTag>
            ))}
          </div>

          <div className="skinType">
            <b>Suitable for:</b> {product.skin_type.join(", ")}
          </div>

          <div className="description">
            {product.description}
          </div>

          <div className="footer">
            <span className="rating">⭐ {product.rating}</span>
            <span className="price">{product.price}</span>
          </div>

          <RlButton name="Add to Cart" />
        </Info>
      </Content>
    </Container>
  );
};

export default ProductDetailPage;

const Container = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: auto;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #555;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid #eee;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s ease;
  }
`;

const Info = styled.div`
  flex: 1;
  min-width: 300px;
  h1 {
    margin: 0;
    font-size: 28px;
  }
  .brand, .type {
    display: inline-block;
    margin-right: 10px;
    font-weight: 600;
    color: #555;
  }
  .effects, .skinType {
    margin: 15px 0;
  }
  .description {
    margin: 20px 0;
    line-height: 1.5;
    color: #333;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    margin: 20px 0;
  }
`;

const EffectTag = styled.span`
  display: inline-block;
  background: #e0f7fa;
  color: #00796b;
  padding: 4px 10px;
  border-radius: 12px;
  margin-right: 5px;
  margin-top: 5px;
  font-size: 14px;
`;
