import React, { useState } from "react";
import { useOrderItems } from "vtex.order-items/OrderItems";
import style from "./styles.css";

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
    <div className={style.shelfItems}>
      <div className={style.shelfItem}>
        <div className="shelfContent">
          <a href={linkURL} className={style.shelfLink}>
            <div className={style.shelfImages}>
              <img src={imageURL} alt={name} className={style.shelfImage} />
            </div>
          </a>
          <a href={linkURL} className={style.shelfLink}>
            <h2 className={style.shelfProductName}>{name}</h2>
          </a>
          <div className={style.shelfPrice}>
            <p className={style.shelfSellingPrice}>{formatPrice(listPrice)}</p>
          </div>
        </div>
        <button
          id={id}
          onClick={() => addToCart(id, setCountProd1, countProd1)}
          className={style.shlefButtonAddToCard}
        >
          ADICIONAR AO CARRINHO
        </button>
      </div>

      <div className={style.shelfMeddle}>
        <h1 className={style.shelfPlus}>+</h1>
      </div>

      <div className={style.shelfItem}>
        <div className="shelfContent">
          <a href={linkURL2} className={style.shelfLink}>
            <div className={style.shelfImages}>
              <img src={imageURL2} alt={name2} className={style.shelfImage} />
            </div>
          </a>
          <a href={linkURL2} className={style.shelfLink}>
            <h2 className={style.shelfProductName}>{name2}</h2>
          </a>
          <div className={style.shelfPrice}>
            <p className={style.shelfSellingPrice}>{formatPrice(listPrice2)}</p>
          </div>
        </div>
        <button
          id={id2}
          onClick={() => addToCart(id2, setCountProd2, countProd2)}
          className={style.shlefButtonAddToCard}
        >
          ADICIONAR AO CARRINHO
        </button>
      </div>

      <div className={style.shelfMeddle}>
        <h1 className={style.shelfPlus}>=</h1>
      </div>

      <div className={style.shelfCombo}>
        <p className={style.shelfCTA}>Compre os dois por:</p>
        <p className={style.shelfBestPriceCombo}>
          {formatPrice(listPrice + listPrice2)}
        </p>
        <button
          id={id}
          onClick={addToCartCombo}
          className={style.shlefButtonAddToCard}
        >
          Adicionar este <br /> combo ao carrinho
        </button>
      </div>
    </div>
  );
};

export default ShelfItem;
