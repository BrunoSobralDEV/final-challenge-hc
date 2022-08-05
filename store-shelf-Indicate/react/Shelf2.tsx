import React, { useState, useEffect } from 'react'
import ShelfItem from "./ShelfItem";
import { SliderLayout } from 'vtex.slider-layout'
import { useCssHandles } from 'vtex.css-handles'
import { useOrderItems } from 'vtex.order-items/OrderItems'

const CSS_HANDLES = [
  "shelfContainer",
  "shelfTitle",
  "add-to-cart-button"
]

const Shelf2 = () => {
  const { addItems } = useOrderItems()
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
        console.log(data)
      });
  }

  const addToCard = (event: any) => {

    const id = (event.target.id)
    fetch(`/api/catalog_system/pub/products/search?fq=productId:${id}`)
      .then(response => response.json())
      .then(data => {
        populateCart(data)
        populateCart(data)

      });
  }
  const addToCardCombo = (event: any) => {
    console.log('adicinei combo')
    const id = (event.target.id)
    fetch(`/api/catalog_system/pub/products/search?fq=productId:${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        populateCartCombo(data)
      });
  }
  const populateCart = (data: any) => {
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
  const populateCartCombo = (data: any) => {

    const cart1 = [

      
      {
        additionalInfo: {
          brandName: data[1].brand,
          __typename: 'ItemAdditionalInfo',
        },
        availability: data[1].items[0].sellers[0].commertialOffer.IsAvaiable,
        id: data[1].items[1].itemId,
        imageUrls: {
          altx: data[1].items[0].images[0].imageUrl,
          __typename: 'ImageUrls',
        },
        listPrice: data[1].items[1].sellers[0].commertialOffer.ListPrice,
        measurementUnit: data[0].items[0].measurementUnit,
        name: data[1].productName,
        price: data[1].items[1].sellers[0].commertialOffer.price,
        productId: data[1].productId,
        quantity: 1,
        seller: data[1].items[1].sellers[0].sellerId,
        sellingPrice: data[1].items[1].nameComplete,
        unitMultiplier: data[1].items[1].unitMultiplier,
        uniqueId: data[1].items[1].itemId,
        isGift: false,
        __typename: "Item",
      }
    ]
      
    addItems(cart1)
  }
  


  return (<div className={`${handles.shelfContainer}`}>
    <h1 className={`${handles.shelfTitle}`}>Produtos mais vendidos</h1>

    {arrayProducts ?
      <>
        <SliderLayout
          itemsPerPage={{
            desktop: 2,
            tablet: 1,
            mobile: 1,
          }}
          showNavigationArrows= "desktopOnly"
          showPaginationDots= "desktopOnly" >
          {arrayProducts.map((product: any) => (
            <ShelfItem
              key={product.id}
              id={product.productId}
              linkURL={product.link}
              imageURL={product.items[0].images[0].imageUrl}
              name={product.productName}
              sellingPrice={product.items[0].sellers[0].commertialOffer.ListPrice}
              price={product.items[0].sellers[0].commertialOffer.Price}
              addToCard={addToCard}
              addToCardCombo={addToCardCombo}
            />
          ))}
        </SliderLayout>

      </>
      : ''}

  </div>)
}



export default Shelf2
