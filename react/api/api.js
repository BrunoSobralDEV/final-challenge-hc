const aws = "https://3jfc0467k2.execute-api.us-east-1.amazonaws.com/compra";
const vtexSku = "/api/catalog_system/pvt/sku/stockkeepingunitbyid";
const vtexProduct = "/api/catalog_system/pub/products/search?fq=productId";

// SKU obtained from product?.selectedItem?.ItemId
export async function getSuggestions(skuId) {
  const response = await fetch(`${aws}?sku=${skuId}`);
  return await response.json();
}

export async function getProduct(skuId) {
  const skuResponse = await fetch(`${vtexSku}/${skuId}`);
  if (skuResponse.status !== 200) return null;
  const skuData = await skuResponse.json();
  const productResponse = await fetch(`${vtexProduct}:${skuData?.ProductId}`);
  const productData = await productResponse.json();
  return productData[0];
}
