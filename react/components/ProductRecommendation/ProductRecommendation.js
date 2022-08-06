import React, { useState, useEffect } from "react";
import { useProduct } from "vtex.product-context";
import { getProduct, getSuggestions } from "../../api/api";

const rank = (suggestions, productSku) => {
  const bestCombination = suggestions.reduce((best, cur) => {
    if (cur.quantity > best.quantity) return cur;
    return best;
  }, suggestions[0]);
  const { skuId } = bestCombination.skus.find((sku) => sku !== productSku);
  return skuId;
};

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

    const reset = () => {
      setRecommendedProduct(null);
      setBestSku(null);
    };

    setLoading(true);
    getSuggestions(productSku).then((data) => {
      if (data.length === 0) reset();
      else setBestSku(rank(data, productSku));
      setCurrentSku(productSku);
      setLoading(false);
    });
  }, [productSku]);

  // 3. Obtém informação do produto recomendado via API da VTEX
  useEffect(() => {
    if (!bestSku) return;
    getProduct(bestSku).then((data) => setRecommendedProduct(data));
  }, [bestSku]);

  if (recommendedProduct) {
    return <h1>UI muito legal</h1>;
  }
  return <h1>No combinations found (temp)</h1>;
};

export default ProductRecommendation;
