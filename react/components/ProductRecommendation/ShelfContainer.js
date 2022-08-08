import React, { useState } from "react";
import { useOrderItems } from "vtex.order-items/OrderItems";
import style from "./styles.css";
import Notification from "./Notification";

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
  const [clicked, setClicked] = useState(false);

  const showNotification = () => {
    if (clicked) setClicked(false);
    setTimeout(() => {
      setClicked(false);
    }, 3000);
    setClicked(true);
  };

  const addToCart = (skuId, incrementCount, counter) => {
    const item = [
      {
        id: skuId,
        seller: 1,
        quantity: counter + 1,
      },
    ];

    addItems(item).then(() => {
      incrementCount(counter + 1);
      showNotification();
    });
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
      showNotification();
    });
  };

  return (
    <div className={style.recItems}>
      <div className={style.recItem}>
        <div className={style.recContent}>
          <a href={linkURL} className={style.recLink}>
            <div className={style.recImages}>
              <img src={imageURL} alt={name} className={style.recImage} />
            </div>
          </a>
          <div className={style.recNamePriceContainer}>
            <a href={linkURL} className={style.recLink}>
              <h2 className={style.recProductName}>{name}</h2>
            </a>
            <div className={style.recPrice}>
              <p className={style.recSellingPrice}>{formatPrice(listPrice)}</p>
            </div>
          </div>
        </div>
        <button
          id={id}
          onClick={() => addToCart(id, setCountProd1, countProd1)}
          className={style.recButtonAddToCart}
        >
          ADICIONAR AO CARRINHO
        </button>
      </div>

      <div className={style.recMeddle}>
        <h1 className={style.recPlus}>+</h1>
      </div>

      <div className={style.recItem}>
        <div className={style.recContent}>
          <a href={linkURL2} className={style.recLink}>
            <div className={style.recImages}>
              <img src={imageURL2} alt={name2} className={style.recImage} />
            </div>
          </a>
          <div className={style.recNamePriceContainer}>
            <a href={linkURL2} className={style.recLink}>
              <h2 className={style.recProductName}>{name2}</h2>
            </a>
            <div className={style.recPrice}>
              <p className={style.recSellingPrice}>{formatPrice(listPrice2)}</p>
            </div>
          </div>
        </div>
        <div className={style.recButtonContainer}>
          <button
            id={id2}
            onClick={() => addToCart(id2, setCountProd2, countProd2)}
            className={style.recButtonAddToCart}
          >
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>

      <div className={style.recMeddle}>
        <h1 className={style.recPlus}>=</h1>
      </div>

      <div className={style.recCombo}>
        <p className={style.recCTA}>Compre os dois por:</p>
        <p className={style.recBestPriceCombo}>
          {formatPrice(listPrice + listPrice2)}
        </p>
        <div className={style.recButtonContainer}>
          <button
            id={id}
            onClick={addToCartCombo}
            className={style.recButtonAddToCart}
          >
            Adicionar este <br /> combo ao carrinho
          </button>
        </div>
      </div>

      {clicked && <Notification />}
    </div>
  );
};

export default ShelfItem;
