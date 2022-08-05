import React, { useState, useEffect } from "react";
import { useProduct } from "vtex.product-context";
import { getSuggestions } from "../../api/api";

import { useQuery } from "react-apollo";
import findProductInfo from "../../queries/productInfo.graphql";

const ProductRecommendation = () => {
  const [loading, setLoading] = useState(false);
  const [bestSku, setBestSku] = useState(null);
  // const [currentSku, setCurrentSku] = useState(null);

  // 1. Obtém informações do produto atual
  const product = useProduct();
  const productSku = product?.selectedItem?.itemId;
  // setCurrentSku(productSku);
  console.log("produto", product);

  // Obtém a melhor sugestão, armazena somente o SKU
  const rank = (suggestions) => {
    const bestCombination = suggestions.reduce((best, cur) => {
      if (cur.quantity > best.quantity) return cur;
      return best;
    }, suggestions[0]);
    const { skuId } = bestCombination.skus.find((sku) => sku !== productSku);
    console.log("melhor", skuId);
    setBestSku(skuId);
  };

  // 2. Obter sugestões de produtos
  useEffect(() => {
    if (!product) return;
    console.log("sku updated");

    const handleSku = async (sku) => {
      // Evitar chamar várias vezes a API da AWS na mesma página
      // if (loading) return;
      // setLoading(true);
      const suggestions = await getSuggestions(sku);
      console.log("todos", suggestions);
      rank(suggestions);
    };

    handleSku(productSku);
  });

  // Problema: como esperar a AWS retornar o SKU recomendado,
  // pra então fazer a query no Graphql
  const { data } = useQuery(findProductInfo, {
    variables: { field: "sku", value: bestSku },
    ssr: false,
  });
  console.log("data", { data });

  return <h1>UI muito legal</h1>;
};

export default ProductRecommendation;
