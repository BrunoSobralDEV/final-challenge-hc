import React, { useEffect, useState } from "react";
import { useOrderItems } from "vtex.order-items/OrderItems";
import { useCssHandles } from "vtex.css-handles";

const CSS_HANDLES = [
  "shelfItem",
  "shelfLink",
  "shelfImage",
  "shelfImages",
  "shelfImage__img",
  "shelfProductName",
  "shelfPrice",
  "shelfSellingPrice",
  "shelfBestPrice",
  "shlefButtonAddToCard",
  "shelfPlus",
  "shelfItems",
  "shelfMeddle",
  "shelfCombo",
  "shelfBestPriceCombo",
];

const formatPrice = (value) => {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "brl",
  });
};

const ShelfItem = ({
  id,
  linkURL,
  imageURL,
  name,
  listPrice,
  id2,
  linkURL2,
  imageURL2,
  name2,
  listPrice2,
}) => {
  const { addItems } = useOrderItems();
  const [countProd1, setCountProd1] = useState(0);
  const [countProd2, setCountProd2] = useState(0);
  const handles = useCssHandles(CSS_HANDLES);

  const addToCart = (skuId, incrementCount, counter) => {
    const item = [
      {
        id: skuId,
        seller: 1,
        quantity: counter + 1,
      },
    ];

    addItems(item).then(() => incrementCount(counter + 1));
  };

  const addToCartCombo = () => {
    console.log("count", countProd1, countProd2);
    const items = [
      {
        id,
        seller: 1,
        quantity: countProd1 + 1,
      },
      {
        id: id2,
        seller: 1,
        quantity: countProd2 + 1,
      },
    ];

    addItems(items).then(() => {
      setCountProd1(countProd1 + 1);
      setCountProd2(countProd2 + 1);
    });
  };

  return (
    <div>
      <div>
        <a href={linkURL}>
          <div>
            <img src={imageURL} alt={name} />
          </div>
        </a>
        <h2>{name}</h2>
        <div>
          <p>{formatPrice(listPrice)}</p>
        </div>
        <button
          id={id}
          onClick={() => addToCart(id, setCountProd1, countProd1)}
        >
          ADICIONAR AO CARRINHO
        </button>
      </div>

      <div>
        <h1>+</h1>
      </div>

      <div className="product">
        <a href={linkURL2}>
          <div>
            <img src={imageURL2} alt={name2} />
          </div>
        </a>
        <h2>{name2}</h2>
        <div>
          <p>{formatPrice(listPrice2)}</p>
        </div>
        <button
          id={id2}
          onClick={() => addToCart(id2, setCountProd2, countProd2)}
        >
          ADICIONAR AO CARRINHO
        </button>
      </div>

      <div>
        <p>{formatPrice(listPrice + listPrice2)}</p>
        <button id={id} onClick={addToCartCombo}>
          Adicionar este <br /> combo ao carrinho
        </button>
      </div>
    </div>
  );
};

export default ShelfItem;
