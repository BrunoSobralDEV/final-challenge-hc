import React, { useState, useEffect } from "react";
import { useProduct } from "vtex.product-context";
import { getProduct, getSuggestions } from "../../api/api";
import ShelfContainer from "./ShelfContainer";
import { useCssHandles } from "vtex.css-handles";

const CSS_HANDLES = ["slider"];

const ProductRecommendation = () => {
  const [loading, setLoading] = useState(false);
  const [currentSku, setCurrentSku] = useState(null);
  const [bestSku, setBestSku] = useState(null);
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const { handles } = useCssHandles(CSS_HANDLES);

  // 1. Obtém informações do produto atual (pdp)
  const product = useProduct();
  const productSku = product?.selectedItem?.itemId;

  const reset = () => {
    setRecommendedProduct(null);
    setBestSku(null);
  };

  // 2. Obtém sugestões de produtos via API da AWS
  useEffect(() => {
    // Evita chamar várias vezes a API
    if (!product || productSku === currentSku || loading) return;

    const handleSku = async (sku) => {
      console.log("ScratStore - Current product: ", product);
      console.log("ScratStore - New SKU selected: ", productSku);
      setLoading(true);
      reset();

      console.log("ScratStore - Consuming AWS API...");
      const data = await getSuggestions(sku);
      console.log("ScratStore - Suggestions: ", data);
      if (data.length === 0) reset();
      else rank(data);

      setCurrentSku(productSku);
      setLoading(false);
    };

    handleSku(productSku);
  }, [productSku]);

  // 3. Obtém a melhor sugestão e armazena o SKU
  const rank = (suggestions) => {
    const bestCombination = suggestions.reduce((best, cur) => {
      if (cur.quantity > best.quantity) return cur;
      return best;
    }, suggestions[0]);
    const { skuId } = bestCombination.skus.find(
      (sku) => sku.skuId !== productSku
    );
    console.log("ScratStore - Recommended SKU: ", skuId);
    setBestSku(skuId);
  };

  // 4. Obtém informações do produto recomendado via API da VTEX
  useEffect(() => {
    if (!bestSku) return;
    console.log("ScratStore - Consuming VTEX API... ");
    getProduct(bestSku).then((data) => {
      console.log("ScratStore - Recommended Product: ", data);
      setRecommendedProduct(data);
    });
  }, [bestSku]);

  // Ignorar SKUs indisponíveis para compra
  if (
    (product &&
      product?.selectedItem?.sellers[0]?.commertialOffer?.AvailableQuantity ===
        0) ||
    (recommendedProduct &&
      recommendedProduct.items.find(({ itemId }) => itemId === bestSku)
        ?.sellers[0]?.commertialOffer?.AvailableQuantity === 0)
  ) {
    return <></>;
  }

  if (recommendedProduct) {
    return (
      <div className={handles.slider}>
        <h1>Quem comprou, comprou também</h1>
        <ShelfContainer
          id={product?.selectedItem?.itemId}
          linkURL={`/${product?.product?.linkText}/p`}
          imageURL={product?.selectedItem?.images[0]?.imageUrl}
          name={product?.product?.productName}
          listPrice={
            product?.selectedItem?.sellers[0]?.commertialOffer?.ListPrice
          }
          id2={bestSku}
          linkURL2={recommendedProduct?.link}
          imageURL2={
            recommendedProduct.items.find(({ itemId }) => itemId === bestSku)
              ?.images[0]?.imageUrl
          }
          name2={recommendedProduct.productName}
          listPrice2={
            recommendedProduct.items.find(({ itemId }) => itemId === bestSku)
              ?.sellers[0]?.commertialOffer?.ListPrice
          }
        />
      </div>
    );
  }

  return <></>;
};

export default ProductRecommendation;
