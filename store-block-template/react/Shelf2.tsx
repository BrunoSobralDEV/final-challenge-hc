import React, { useState, useEffect } from 'react'
import ShelfItem from "./ShelfItem";
import { SliderLayout } from 'vtex.slider-layout'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
   "shelfContainer",
   "shelfTittle",
   "add-to-cart-button"
]

const Shelf2 = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const [arrayProducts, setArrayProducts] = useState([]) as any

  useEffect(() => {
    getCategoryItems()
  }, [])

  const getCategoryItems = () => {
    fetch('/api/catalog_system/pub/products/search/moda-feminina')
      .then(response => response.json())
      .then(data => {
        setArrayProducts(data)
      });
  }
  
  const addToCard = (event: any) => {

    fetch('/api/catalog_system/pub/products/search/moda-feminina')
      .then(response => response.json())
      .then(data => {
        setArrayProducts(data)
        console.log(data)
      });
    console.log(event)
    
    



    // window.location.href = '/checkout/#/cart'

    
  }


  return (<div className={`${handles.shelfContainer}`}>
    <h1 className={`${handles.shelfTittle}`}>Produtos mais vendidos</h1>

    {arrayProducts ?
      <>
      <SliderLayout
      itemsPerPage={{
        desktop: 2,
        tablet: 1,
        mobile: 1,
      }}>
      {arrayProducts.map((product: any) =>(
          <ShelfItem
          key={product.id}
          id={product.id}
          linkURL={product.link} 
          imageURL={product.items[0].images[0].imageUrl} 
          name={product.productName} 
          sellingPrice={product.items[0].sellers[0].commertialOffer.ListPrice} 
          price={product.items[0].sellers[0].commertialOffer.Price} 
          addToCard={addToCard}
          />
        ))}
      </SliderLayout>
        
      </>
      : ''}

  </div>)
}



export default Shelf2
