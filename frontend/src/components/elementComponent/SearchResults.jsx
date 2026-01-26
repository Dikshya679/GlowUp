import React from 'react'
import ProductCard from './recommendedProduct';
import styled from 'styled-components';

const SearchResults = ({products}) => {

  return (
<SearchProductContainer>
 {products.map((product, index)=>(
  <div key={index} className='productCardContaineer'><ProductCard product={product}/></div>
 ))}
</SearchProductContainer>
  )
}

export default SearchResults
const SearchProductContainer = styled.main`
padding: 20px;
display: flex;
flex-wrap: wrap;
width: 100%;
height: fit-content;
align-items: center;
justify-content: center;
gap: 10px;
.productCardContaineer{
  display: inline-block;
}
`;