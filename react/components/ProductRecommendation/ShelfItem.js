import React, { useEffect, useState } from "react";
import { useOrderItems } from "vtex.order-items/OrderItems";

const formatPrice = (value) => {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    style: "currency",
    currency: "brl",
  });
};

const ShelfItem = ({ id, linkURL, imageURL, name, price, listPrice }) => {
  const { addItems } = useOrderItems();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count === 0) return;
    addToCart(id);
  }, [count]);

  const addToCart = (skuId) => {
    const item = [
      {
        id: skuId,
        seller: 1,
        quantity: count,
      },
    ];

    addItems(item);
  };

  return (
    <div className="recommendation">
      <a href={linkURL}>
        <div>
          <img src={imageURL} alt={name} />
        </div>
      </a>
      <h2>{name}</h2>
      <div>
        <p>{formatPrice(listPrice)}</p>
        {/* <p>{formatPrice(price)}</p> */}
      </div>
      <button id={id} onClick={() => setCount(count + 1)}>
        ADICIONAR AO CARRINHO
      </button>
    </div>
  );
};

export default ShelfItem;
