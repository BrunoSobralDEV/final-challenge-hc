import React, { useState, useEffect } from 'react'
import ShelfItem from "./ShelfItem";
import { SliderLayout } from 'vtex.slider-layout'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import style from "./styles.css";



const Shelf2 = () => {
  const { addItems } = useOrderItems()
  const handles = style
  const [arrayProducts, setArrayProducts] = useState([]) 

  useEffect(() => {
    getCategoryItems()
  }, [])

  const getCategoryItems = () => {
    fetch('/api/catalog_system/pub/products/search/moda-feminina')
      .then(response => response.json())
      .then(data => {
        setArrayProducts(data)
        console.log(data)
      });
  }

  const addToCard = (event) => {

    const id = (event.target.id)
    fetch(`/api/catalog_system/pub/products/search?fq=productId:${id}`)
      .then(response => response.json())
      .then(data => {
        populateCart(data)  
      });
  }
  
  const populateCart = (data) => {
    const cart = [

      {
        additionalInfo: {
          brandName: data[0].brand,
          __typename: 'ItemAdditionalInfo',
        },
        availability: data[0].items[0].sellers[0].commertialOffer.IsAvaiable,
        id: data[0].items[0].itemId,
        imageUrls: {
          altx: data[0].items[0].images[0].imageUrl,
          __typename: 'ImageUrls',
        },
        listPrice: data[0].items[0].sellers[0].commertialOffer.ListPrice,
        measurementUnit: data[0].items[0].measurementUnit,
        name: data[0].productName,
        price: data[0].items[0].sellers[0].commertialOffer.price,
        productId: data[0].productId,
        quantity: 1,
        seller: data[0].items[0].sellers[0].sellerId,
        sellingPrice: data[0].items[0].nameComplete,
        unitMultiplier: data[0].items[0].unitMultiplier,
        uniqueId: data[0].items[0].itemId,
        isGift: false,
        __typename: "Item",
      }
    ]

    addItems(cart)
  }
  
      
    
  


  return (<div className={`${handles.shelfContainer}`}>
    <h1 className={`${handles.shelfTitle}`}>Produtos mais vendidos</h1>

    {arrayProducts ?
      <>
        <SliderLayout
          itemsPerPage={{
            desktop: 5,
            tablet: 3,
            mobile: 3,
          }}
          showNavigationArrows= "desktopOnly"
          showPaginationDots= "never" > 
           {arrayProducts.map((product) => (
            <ShelfItem
              key={product.id}
              id={product.productId}
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
