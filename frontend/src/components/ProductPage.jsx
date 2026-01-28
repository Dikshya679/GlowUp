import React, { useState ,useEffect} from 'react'
import styled from 'styled-components'
import RlButton from './elementComponent/Button/Button'
import SimpleButton from './elementComponent/Button/simpleButton';
import ProductCard from './elementComponent/recommendedProduct';
import SearchResults from './elementComponent/SearchResults';
// import useProductfetch from '../hooks/useProductFetch';
const ProductPage = () => {
  // const {data} = useProductfetch("http://127.0.0.1:8000/product/view/");
  const [data , setData] = useState(null)
  const [selectedFilterBtn,setSelectedFilterBtn] = useState("All")
  const [filteredProduct, setFilteredData] = useState(null)
const [searchStatus, setSearchStatus] = useState(false)
const [recommend , setRecommend] = useState(true)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/product/view/",{method:"GET"});
        const json = await response.json();
        setData(json);
        setFilteredData(json);
      } catch (error) {
throw new Error(error)      }
    };
    fetchProductData();
  }, []);


const filterData=(type)=>
{
setRecommend(false)
if(type === "All")
{
  setRecommend(true)
  setFilteredData(data)
  setSelectedFilterBtn("All");
  return;
}
const filter = data?.filter((product)=>
product.product_type.toLowerCase().includes(type.toLowerCase()))
setFilteredData(filter)
setSelectedFilterBtn(type);
};



const searchproduct =(e)=>
{
  setSearchStatus(true)
  setRecommend(false)
const searchValue = e.target.value;
if(searchValue == "")
{
  setSearchStatus(false)
}
const filter = data?.filter((product)=>
product.product_name.toLowerCase().includes(searchValue.toLowerCase()) ||
    product.product_type.toLowerCase().includes(searchValue.toLowerCase()))
setFilteredData(filter)
}

const filterButtons=[
   {
    name: "All",
    type:"All",
  },
    {
      name: "Face Wash",
      type:"Face Wash",
    },
  {
    name: "Toner",
    type:"Toner",
  },
  {
    name: "Serum",
    type:"Serum",
  },
  {
    name: "Moisturizer",
    type:"Moisturizer",
  },
  {
    name: "Sunscreen",
    type:"Sunscreen",
  },

];


const recommendedProducts= [
{'Unnamed: 0': 0, 'product_name': 'ACWELL Bubble Free PH Balancing Cleanser', 'product_type': 'Face Wash', 'brand': 'ACWELL ', 'notable_effects': ['Acne-Free', 'Pore-Care', 'Brightening', 'Anti-Aging'], 'skin_type': ['Oily'], 'price': 'Rs 209.000', 'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/ACWELL_BUBBLE_FREE_PH_BALANCING_CLEANSER.jpg', 'description': "Removes dirt and removes makeup in 1 step, while maintaining the skin's natural pH. Gently cleanses skin without feeling dry and tight. With Centella, Aloe and Witch Hazel extracts which moisturize and soothe, and salicylic acid helps prevent acne. -No harmful chemicals, parabens, artificial dyes, mineral oil, sulfates. -Suitable for all skin types", 'rating': 4.3},
{'Unnamed: 0': 1, 'product_name': 'ACWELL pH Balancing Soothing Cleansing Foam', 'product_type': 'Face Wash', 'brand': 'ACWELL ', 'notable_effects': ['Soothing', 'Balancing'], 'skin_type': ['Normal', 'Dry', 'Combination'], 'price': 'Rs 181.800', 'picture_src': 'https://images.soco.id/8f08ced0-344d-41f4-a15e-9e45c898f92d-.jpg', 'description': 'Cleanses and soothes sensitive skin with dense bubbles. Gently cleanses dirt and sebum, keeping skin moist', 'rating': 1.78},
{'Unnamed: 0': 8, 'product_name': 'AHC Peony Bright Clearing Toner ', 'product_type': 'Toner', 'brand': 'AHC', 'notable_effects': ['Pore-Care', 'Brightening', 'Anti-Aging'], 'skin_type': ['Oily'], 'price': 'Rs 499.000', 'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/PEONY_BRIGHT_CLEANING_TONER.jpg', 'description': 'A light toner that can remove dirt after washing your face and smooth the texture of your face. *Brightening effect from Pink Peony flower extract.', 'rating': 1.38},
{'Unnamed: 0': 9, 'product_name': 'AHC Hyaluronic Toner ', 'product_type': 'Toner', 'brand': 'AHC', 'notable_effects': ['Anti-Aging'], 'skin_type': ['Oily'], 'price': 'Rs 389.000', 'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/HYALURONIC_TONER.jpg', 'description': 'Contains Hyaluronic Acid which moisturizes dry and dehydrated skin, able to replace lost moisture in dry and dull skin, making skin look moist and supple. *Able to remove residual dirt that remains after washing your face and prepare the skin for the next skincare step *Contains herbal and floral essences that restore radiance to dull skin', 'rating': 3.42},
{'Unnamed: 0': 10, 'product_name': 'AHC Peony Bright Luminous Serum', 'product_type': 'Serum', 'brand': 'AHC', 'notable_effects': ['Brightening', 'Anti-Aging', 'UV-Protection'], 'skin_type': ['Oily'], 'price': 'Rs 574.000', 'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/PEONY_BRIGHT_LUMINOUS_SERUM.jpg', 'description': 'Light serum that can brighten the skin and keep it radiant *Brightening effect from Pink Peony flower extract', 'rating': 2.3}
]



  return <MainContainer>
    {/* headbar */}
<div className="headBar">
<div className="filterContainer">
{filterButtons.map((productType)=>(
  <SimpleButton name={productType.name} key={productType.name} 
  isSelected={selectedFilterBtn === productType.type}
  onClick={()=>filterData(productType.type)}
  />
))

}
</div>
<div className="searchBar">
  <input type="text" placeholder="Search here..." onChange={searchproduct}/>
 <SimpleButton name="Search"/>
</div>
  </div>
 {/* headbar */}



{!searchStatus && <ProductContainer>

{/* Recommended Product Container */}
{
  recommend && 
  <>
  <h3>Recommended for you</h3>
<div className="RecommendedProducts">
 {recommendedProducts.map((product, index)=>(
  <div key={index} className='productCardContaineer'><ProductCard product={product}/></div>
 ))}
</div>
  </>


}
{/* Recommended Product Container */}



{/* Product Container */}
<h3>Products</h3>
<div className="products">
 {filteredProduct?.map((product, index)=>(
  <div key={index} className='productCardContaineer'><ProductCard product={product}/></div>
 ))}
</div>
{/* Product Container */}

</ProductContainer>}

{searchStatus && <SearchResults products={filteredProduct}/>}

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
.productCardContaineer{
  display: inline-block;
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
  padding: 30px;
  display: flex;
flex-wrap: nowrap;
overflow-x: auto;
 overflow-y: hidden;  
scroll-behavior: smooth; 
width: 100%;
justify-content: space-around;
gap: 20px;
scrollbar-width: none;
}
.products{
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
width: 100%;
height: fit-content;
align-items: center;
justify-content: center;
gap: 10px;
}
`;


const ProductContainer = styled.section`
 display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-top: 20px;
  h3{
   color :white ;
   font-size: 1.5rem;
  }
`;
