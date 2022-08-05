const baseUrl = "https://3jfc0467k2.execute-api.us-east-1.amazonaws.com/compra";

// sku = product.selectedItem.ItemId
export async function getSuggestions(sku) {
  const response = await fetch(`${baseUrl}?sku=${sku}`);
  const data = await response.json();
  return data;
}
