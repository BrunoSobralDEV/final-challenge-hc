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
  const { handles } = useCssHandles(CSS_HANDLES);

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
    <div className={handles.shelfItems}>
      <div className={handles.shelfItem}>
        <a href={linkURL} className={handles.shelfLink}>
          <div className={handles.shelfImages}>
            <img src={imageURL} alt={name} className={handles.shelfImage} />
          </div>
        </a>
        <h2 className={handles.shelfProductName}>{name}</h2>
        <div className={handles.shelfPrice}>
          <p className={handles.shelfSellingPrice}>{formatPrice(listPrice)}</p>
        </div>
        <button
          id={id}
          onClick={() => addToCart(id, setCountProd1, countProd1)}
          className={handles.shlefButtonAddToCard}
        >
          ADICIONAR AO CARRINHO
        </button>
      </div>

      <div className={handles.shelfMeddle}>
        <h1 className={handles.shelfPlus}>+</h1>
      </div>

      <div className={handles.shelfItem}>
        <a href={linkURL2} className={handles.shelfLink}>
          <div className={handles.shelfImages}>
            <img src={imageURL2} alt={name2} className={handles.shelfImage} />
          </div>
        </a>
        <h2 className={handles.shelfProductName}>{name2}</h2>
        <div className={handles.shelfPrice}>
          <p className={handles.shelfSellingPrice}>{formatPrice(listPrice2)}</p>
        </div>
        <button
          id={id2}
          onClick={() => addToCart(id2, setCountProd2, countProd2)}
          className={handles.shlefButtonAddToCard}
        >
          ADICIONAR AO CARRINHO
        </button>
      </div>

      <div className={handles.shelfMeddle}>
        <h1 className={handles.shelfPlus}>=</h1>
      </div>

      <div className={handles.shelfCombo}>
        <p className={handles.shelfBestPriceCombo}>
          {formatPrice(listPrice + listPrice2)}
        </p>
        <button
          id={id}
          onClick={addToCartCombo}
          className={handles.shlefButtonAddToCard}
        >
          Adicionar este <br /> combo ao carrinho
        </button>
      </div>
    </div>
  );
};

export default ShelfItem;
