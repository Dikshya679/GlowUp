import React, { useState } from 'react'
import styled from 'styled-components'
import RlButton from './elementComponent/Button/Button'
import SimpleButton from './elementComponent/Button/simpleButton';
import ProductCard from './elementComponent/recommendedProduct';
import SearchResults from './elementComponent/SearchResults';
const ProductPage = () => {
const [selectedFilterBtn,setSelectedFilterBtn] = useState("All")
// const [filteredProduct, setFilteredData] = useState(null)
const [searchStatus, setSearchStatus] = useState(false)


const filterData=(type)=>
{
setSelectedFilterBtn(type)
console.log(type)
}



const searchproduct =(e)=>
{
  setSearchStatus(true)
const searchValue = e.target.value;
if(searchValue == "")
{
  setSearchStatus(false)
}
}

const filterButtons=[
   {
    name: "All",
    type:"All",
  },
  // {
  //   name: "Cleansers",
  //   type:"Cleansers",
  // },
  // {
    //   name: "Exfoliator",
    //   type:"Exfoliator",
    // },
    {
      name: "Face Wash",
      type:"Face Wash",
    },
  {
    name: "Toner",
    type:"Toners",
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
  // {
  // name: "Mask",
  // type:"Mask",
  // },
  // {
  // name: "Facial_oil",
  // type:"Facial_oil",
  // },
 
];

// const filterProduct = (type)=>
// {
// if(type == "all")
// {
  
// }
// }



const recommendedProducts= [
{'Unnamed: 0': 0, 'product_name': 'ACWELL Bubble Free PH Balancing Cleanser', 'product_type': 'Face Wash', 'brand': 'ACWELL ', 'notable_effects': ['Acne-Free', 'Pore-Care', 'Brightening', 'Anti-Aging'], 'skin_type': ['Oily'], 'price': 'Rp 209.000', 'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/ACWELL_BUBBLE_FREE_PH_BALANCING_CLEANSER.jpg', 'description': "Removes dirt and removes makeup in 1 step, while maintaining the skin's natural pH. Gently cleanses skin without feeling dry and tight. With Centella, Aloe and Witch Hazel extracts which moisturize and soothe, and salicylic acid helps prevent acne. -No harmful chemicals, parabens, artificial dyes, mineral oil, sulfates. -Suitable for all skin types", 'rating': 4.3},
{'Unnamed: 0': 1, 'product_name': 'ACWELL pH Balancing Soothing Cleansing Foam', 'product_type': 'Face Wash', 'brand': 'ACWELL ', 'notable_effects': ['Soothing', 'Balancing'], 'skin_type': ['Normal', 'Dry', 'Combination'], 'price': 'Rp 181.800', 'picture_src': 'https://images.soco.id/8f08ced0-344d-41f4-a15e-9e45c898f92d-.jpg', 'description': 'Cleanses and soothes sensitive skin with dense bubbles. Gently cleanses dirt and sebum, keeping skin moist', 'rating': 1.78},
{'Unnamed: 0': 8, 'product_name': 'AHC Peony Bright Clearing Toner ', 'product_type': 'Toner', 'brand': 'AHC', 'notable_effects': ['Pore-Care', 'Brightening', 'Anti-Aging'], 'skin_type': ['Oily'], 'price': 'Rp 499.000', 'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/PEONY_BRIGHT_CLEANING_TONER.jpg', 'description': 'A light toner that can remove dirt after washing your face and smooth the texture of your face. *Brightening effect from Pink Peony flower extract.', 'rating': 1.38},
{'Unnamed: 0': 9, 'product_name': 'AHC Hyaluronic Toner ', 'product_type': 'Toner', 'brand': 'AHC', 'notable_effects': ['Anti-Aging'], 'skin_type': ['Oily'], 'price': 'Rp 389.000', 'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/HYALURONIC_TONER.jpg', 'description': 'Contains Hyaluronic Acid which moisturizes dry and dehydrated skin, able to replace lost moisture in dry and dull skin, making skin look moist and supple. *Able to remove residual dirt that remains after washing your face and prepare the skin for the next skincare step *Contains herbal and floral essences that restore radiance to dull skin', 'rating': 3.42},
{'Unnamed: 0': 10, 'product_name': 'AHC Peony Bright Luminous Serum', 'product_type': 'Serum', 'brand': 'AHC', 'notable_effects': ['Brightening', 'Anti-Aging', 'UV-Protection'], 'skin_type': ['Oily'], 'price': 'Rp 574.000', 'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/PEONY_BRIGHT_LUMINOUS_SERUM.jpg', 'description': 'Light serum that can brighten the skin and keep it radiant *Brightening effect from Pink Peony flower extract', 'rating': 2.3}

]


const products = [
  {
    'Unnamed: 0': 12,
    'product_name': 'AIZEN Incredipeel Exfoliating + Purifying Facial Toner',
    'product_type': 'Toner',
    'brand': 'AIZEN ',
    'notable_effects': ['Balancing', 'Oil-Control', 'Pore-Care'],
    'skin_type': ['Normal', 'Combination'],
    'price': 'Rp 139.000',
    'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/Aizen_Incredipeel_Exfoliating_%2B_Purifying_Facial_Toner.png',
    'description': "Incredipeel Exfoliating & Purifying Facial Toner is a toner containing AHA, BHA, and Tonic Complex which is effective for removing dead skin cells, brightening, nourishing the skin, helping balance the skin's pH, and also making it easier to absorb the next skincare series.",
    'rating': 1.62
  },
  {
    'Unnamed: 0': 13,
    'product_name': 'AIZEN Whitifique Face Cream',
    'product_type': 'Moisturizer',
    'brand': 'AIZEN',
    'notable_effects': ['Brightening', 'Anti-Aging', 'UV-Protection'],
    'skin_type': ['Oily'],
    'price': 'Rp 139.000',
    'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/Aizen_Whitifique_Face_Cream.png',
    'description': "Aizen Whitifique Face Cream is a facial cream specially formulated to help brighten and whiten facial skin, as well as help fade skin hyperpigmentation quickly and permanently with results in as fast as 7 days. Enriched with Astaxanthin which has antioxidant capacity 600x higher than vitamin C!",
    'rating': 4.51
  },
  {
    'Unnamed: 0': 22,
    'product_name': "A'pieu Deep Clean Foam Cleanser ",
    'product_type': 'Face Wash',
    'brand': "A'PIEU",
    'notable_effects': ['Hydrating', 'Refreshing'],
    'skin_type': ['Normal', 'Dry', 'Combination'],
    'price': 'Rp 35.400',
    'picture_src': 'https://images.soco.id/23644210275-1595757045666.png',
    'description': "Facial cleanser containing baking powder and spring water is known for its cleansing properties, resulting in fresh and clean skin.",
    'rating': 3.56
  },
  {
    'Unnamed: 0': 23,
    'product_name': "A'pieu Deep Clean Cleansing Tissue ",
    'product_type': 'Face Wash',
    'brand': "A'PIEU",
    'notable_effects': ['Hydrating', 'Pore-Care'],
    'skin_type': ['Normal', 'Dry', 'Combination'],
    'price': 'Rp 49.000',
    'picture_src': 'https://images.soco.id/22495855550-1595756965359.png',
    'description': "A'PIEU Cleansing tissue contains baking powder and sparkling water which cleans makeup and dirt deep into the pores.",
    'rating': 2.44
  },
  {
    'Unnamed: 0': 31,
    'product_name': 'Smooth Pure Cleansing Foam',
    'product_type': 'Face Wash',
    'brand': 'ARIUL',
    'notable_effects': ['Hydrating', 'Pore-Care'],
    'skin_type': ['Normal', 'Dry'],
    'price': 'Rp 49.000',
    'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/Ariul_Smooth_and_Pure_Cleansing_Foam_50ML.webp',
    'description': 'Facial foam with soft foam that can clean dirt and small dust particles between pores and keep your skin soft. Equipped with a "Purefull Complex" formulation consisting of Sansevieria, Rosemary, Black Pine Leaf, and Oxygenated Water to provide a fresh and calming therapeutic aroma.',
    'rating': 3.96
  },
  {
    'Unnamed: 0': 41,
    'product_name': 'AVOSKIN Silkyluz The Bohemian Soap 90g',
    'product_type': 'Face Wash',
    'brand': 'AVOSKIN',
    'notable_effects': ['Hydrating', 'Moisturizing'],
    'skin_type': ['Oily', 'Combination', 'Sensitive'],
    'price': 'Rp 42.900',
    'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/jual_avoskin_silkyluz_bohemian_soap.jpg',
    'description': 'Enriched with Kojic Acid, extra coconut and lavender. As well as olive oil to brighten your skin color naturally.',
    'rating': 1.79
  },
  {
    'Unnamed: 0': 42,
    'product_name': 'AVOSKIN YOUR SKIN BAE SERIES Toner Salicylic Acid 1% + Zinc + Tea Tree Water',
    'product_type': 'Toner',
    'brand': 'AVOSKIN',
    'notable_effects': ['Acne-Free', 'Oil-Control', 'Pore-Care'],
    'skin_type': ['Dry', 'Oily', 'Sensitive'],
    'price': 'Rp 149.000',
    'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/YSB-TONER-SALICYLIC-ACID-1_-ZINC-TEA-TREE-WATER-1.jpg',
    'description': 'Anti Acne & Exfoliating Toner Anti Acne and Exfoliating toner with the main content of Salicylic Acid 1% which functions to exfoliate deep into the pores. Combined with Zinc and Tea Tree for optimal effect in treating skin with acne and blackheads while maintaining moisture.',
    'rating': 1.47
  },
  {
    'Unnamed: 0': 43,
    'product_name': 'AVOSKIN Miraculous Retinol Toner 20mL',
    'product_type': 'Toner',
    'brand': 'AVOSKIN',
    'notable_effects': ['Acne-Free', 'Pore-Care', 'Brightening', 'Anti-Aging'],
    'skin_type': ['Dry', 'Oily', 'Sensitive'],
    'price': 'Rp 99.000',
    'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/Avoskin_Retinol_Toner_20ml.jpg',
    'description': 'Toner containing 3% niacinamide, 1% actosome retinol, peptide, and equipped with mangosteen fruit extract to treat fine lines, even out skin texture, and brighten the skin. Works effectively to stimulate the regeneration of new skin cells and increase collagen production. Now available in 20ml size.',
    'rating': 2.59
  },
  {
    'Unnamed: 0': 44,
    'product_name': 'AVOSKIN YOUR SKIN BAE SERIES Toner Ceramide LC S-20 1% + Mugwort + Cica ',
    'product_type': 'Toner',
    'brand': 'AVOSKIN',
    'notable_effects': ['Moisturizing', 'Anti-Aging', 'Skin-Barrier'],
    'skin_type': ['Normal', 'Dry'],
    'price': 'Rp 159.000',
    'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/Avoskin_YOUR_SKIN_BAE_SERIES_Toner_Ceramide_LC_S-20_1%25_%2B_Mugwort_%2B_Cica.jpg',
    'description': 'Toner containing Ceramide which functions to prevent dehydration of the skin and soften the skin. This toner also contains Mugwort and Centella Asiatica Extract which help fill the skin barrier to protect the skin. Equipped with PGA (Polyglutamic Acid) which is a moisturizing agent with the ability to moisturize longer than Hyaluronic Acid. Apart from that, the Squalane content in this product will help increase skin cell regeneration, maintain skin moisture, increase skin elasticity, reduce the appearance of fine lines and wrinkles, and improve skin barrier function.',
    'rating': 0.71
  },
  {
    'Unnamed: 0': 46,
    'product_name': 'AVOSKIN YOUR SKIN BAE SERIES Toner Niacinamide 7% + Alpha Arbutin 1% + Kale',
    'product_type': 'Toner',
    'brand': 'AVOSKIN',
    'notable_effects': ['Pore-Care', 'Brightening', 'Anti-Aging'],
    'skin_type': ['Dry', 'Oily', 'Sensitive'],
    'price': 'Rp 149.000',
    'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/YSB-TONER-NIACINAMIDE-7-ALPHA-ARBUTIN-1-KALE-1.jpg',
    'description': 'Brightening & Hydrating Toner The combination of active and natural ingredients in Niacinamide 7% + Alpha Arbutin 1% + Kale Time to Glow is useful for brightening the skin, helping reduce black spots and hydrating the skin optimally, thus strengthening the skin barrier. Use Niacinamide 7% + Alpha Arbutin 1% + Kale Time to Glow morning and night to perfect your skin care and get the effect of naturally moist, bright and glowing skin.',
    'rating': 2.22
  },
  {
    'Unnamed: 0': 48,
    'product_name': 'AVOSKIN YOUR SKIN BAE SERIES Toner Marine Collagen + Hyacross 2% + Galactomyces',
    'product_type': 'Toner',
    'brand': 'AVOSKIN',
    'notable_effects': ['Anti-Aging'],
    'skin_type': ['Dry'],
    'price': 'Rp 149.000',
    'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/YSB-TONER-ULTIMATE-HYALURON-MARINE-COLLAGEN-5-HYACROSS-2-GALACTOMYCES-1.jpg',
    'description': 'Hydrating & Rejuvenating Toner Ultimate Hyaluron Marine Collagen 5% + Hyacross 2% + Galactomyces Bye Dry Skin is specially formulated to provide optimal hydration effects on the skin and help stimulate collagen in the skin. Skin that maintains moisture will be able to absorb the next skincare product more optimally.',
    'rating': 4.55
  },
  {
    'Unnamed: 0': 51,
    'product_name': 'AVOSKIN YOUR SKIN BAE SERIES Alpha Arbutin 3% + Grapeseed',
    'product_type': 'Serum',
    'brand': 'AVOSKIN',
    'notable_effects': ['Soothing', 'Brightening'],
    'skin_type': ['Dry'],
    'price': 'Rp 125.100',
    'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/SERUM-ALPHA-ARBUTIN-1.png',
    'description': 'Brightening & Antioxidant Serum Serum that combines active ingredients Alpha Arbutin 3% and natural extracts from Grapeseed to brighten skin and fade acne scars. Alpha Arbutin is the most effective and safest brightening agent for the skin. Meanwhile, grapeseed contains antioxidants to keep skin cells healthy.',
    'rating': 1.61
  },
  {
    'Unnamed: 0': 52,
    'product_name': 'AVOSKIN YOUR SKIN BAE SERIES Panthenol 5% + Mugwort + Cica Serum',
    'product_type': 'Serum',
    'brand': 'AVOSKIN',
    'notable_effects': ['Hydrating', 'Anti-Aging', 'Skin-Barrier'],
    'skin_type': ['Normal', 'Dry', 'Combination'],
    'price': 'Rp 139.000',
    'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/Avoskin_YOUR_SKIN_BAE_SERIES_Panthenol_5%25_%2B_Mugwort_%2B_Cica_Serum.jpg',
    'description': 'Serum with a special formula to fill the skin barrier as a natural protector for the skin. The combination of Panthenol 5%, Mugwort Extract, and Cica Extract makes this serum also effective for hydrating the skin, smoothing skin texture, reducing wrinkles, and as an antioxidant.',
    'rating': 4.16
  },
  {
    'Unnamed: 0': 53,
    'product_name': 'AVOSKIN Cica Series Face Primer Serum',
    'product_type': 'Serum',
    'brand': 'AVOSKIN',
    'notable_effects': ['Brightening', 'Anti-Aging'],
    'skin_type': ['Oily'],
    'price': 'Rp 120.000',
    'picture_src': 'https://www.beautyhaul.com/assets/uploads/products/thumbs/800x800/serum11.jpg',
    'description': 'The first serum that is MULTIFUNCTIONAL as a makeup primer at the same time. So it not only makes your face healthy but also functions to make your makeup last longer and disguise large pores. Containing Centella Asiatica, Green Tea, Javanese Turmeric, Vitamin C, this silky serum is great for making the face look brighter, smoother and moister, as well as caring for acne-prone skin. Absorbs quickly and is not sticky on the face. Netto: 15 ml. Free of parabens, alcohol, SLS and mineral oil. BPOM NA 18191905104',
    'rating': 1.69
  }
];



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
  <h3>Recommended products</h3>
<div className="RecommendedProducts">
 {recommendedProducts.map((product, index)=>(
  <div key={index} className='productCardContaineer'><ProductCard product={product}/></div>
 ))}
</div>
{/* Recommended Product Container */}



{/* Product Container */}
<h3>Products</h3>
<div className="products">
 {products.map((product, index)=>(
  <div key={index} className='productCardContaineer'><ProductCard product={product}/></div>
 ))}
</div>
{/* Product Container */}

</ProductContainer>}
{searchStatus && <SearchResults products={recommendedProducts}/>}

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
