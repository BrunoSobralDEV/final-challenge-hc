import React, { useState, useEffect } from "react";
import { useProduct } from "vtex.product-context";
import { getProduct, getSuggestions } from "../../api/api";
import ShelfItem from "./ShelfItem";

const ProductRecommendation = () => {
  const [loading, setLoading] = useState(false);
  const [currentSku, setCurrentSku] = useState(null);
  const [bestSku, setBestSku] = useState(null);
  const [recommendedProduct, setRecommendedProduct] = useState(null);

  // 1. Obtém informações do produto atual (pdp)
  const product = useProduct();
  const productSku = product?.selectedItem?.itemId;

  // 2. Obtém sugestões de produtos via AWS
  useEffect(() => {
    // Evita chamar várias vezes a API
    if (!product || productSku === currentSku || loading) return;

    const handleSku = async (sku) => {
      console.log("hc3 - Current product: ", product);
      console.log("hc3 - New SKU selected: ", productSku);
      setLoading(true);

      console.log("hc3 - Consuming AWS API...");
      const data = await getSuggestions(sku);
      console.log("hc3 - Suggestions: ", data);
      if (data.length === 0) {
        setRecommendedProduct(null);
        setBestSku(null);
      } else rank(data);
      setCurrentSku(productSku);
      setLoading(false);
    };

    handleSku(productSku);
  }, [productSku]);

  // 3. Obtém a melhor sugestão, armazena somente o SKU
  const rank = (suggestions) => {
    const bestCombination = suggestions.reduce((best, cur) => {
      if (cur.quantity > best.quantity) return cur;
      return best;
    }, suggestions[0]);
    const { skuId } = bestCombination.skus.find((sku) => sku !== productSku);
    console.log("hc3 - Recommended SKU: ", skuId);
    setBestSku(skuId);
  };

  // 4. Obtém informações do produto recomendado via VTEX
  useEffect(() => {
    if (!bestSku) return;

    console.log("hc3 - Consuming VTEX API... ");
    getProduct(bestSku).then((data) => {
      console.log("zzz", data);
      console.log("hc3 - Recommended Product: ", data);
      setRecommendedProduct(data);
    });
  }, [bestSku]);

  if (recommendedProduct) {
    // return <h1>UI muito legal</h1>;
    return (
      <div>
        <h1>Quem comprou, comprou também</h1>
        <ShelfItem
          key={product?.selectedItem?.itemId}
          id={product?.selectedItem?.itemId}
          linkURL={`/${product?.product?.linkText}/p`}
          imageURL={product?.product?.items[0]?.images[0]?.imageUrl}
          name={product?.product?.productName}
          price={product?.selectedItem?.sellers[0]?.commertialOffer?.Price}
          listPrice={
            product?.selectedItem?.sellers[0]?.commertialOffer?.ListPrice
          }
        />
        <div>
          <h1>+</h1>
        </div>
        <ShelfItem
          key={bestSku}
          id={bestSku}
          linkURL={recommendedProduct?.link}
          imageURL={
            recommendedProduct.items.filter(({ itemId }) => itemId === bestSku)
              .images[0].imageUrl
          }
          name={recommendedProduct.productName}
          listPrice={
            recommendedProduct.items.filter(({ itemId }) => itemId === bestSku)
              .sellers[0].commertialOffer.ListPrice
          }
          // listPrice={
          //   product?.selectedItem?.sellers[0]?.commertialOffer?.ListPrice
          // }
        />
      </div>
    );
  }
  return <h1>No combinations found</h1>;
};

export default ProductRecommendation;
