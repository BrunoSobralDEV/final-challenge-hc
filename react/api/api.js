const aws = "https://3jfc0467k2.execute-api.us-east-1.amazonaws.com/compra";
const vtex = "/api/catalog_system/pvt/sku/stockkeepingunitbyid";

// SKU obtained from product?.selectedItem?.ItemId
export async function getSuggestions(skuId) {
  const response = await fetch(`${aws}?sku=${skuId}`);
  return await response.json();
}

export async function getProduct(skuId) {
  const response = await fetch(`${vtex}/${skuId}`);
  return await response.json();
}
