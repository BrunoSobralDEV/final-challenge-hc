const orderHookItems = [
  { id: "15", sku: "10" }, // calça
  { id: "12", sku: "200" }, // blusa
  { id: "14", sku: "5000" }, // bermuda
  { id: "12", sku: "5000" } // bermuda
]

orderHookItems.sort((a, b) => Number(a.sku) - Number(b.sku))

function composeCombinationId(skuLength, sku) {
  let qntdZeros = 5 - skuLength;
  let combinacao = 's';
//   let k = qntdZeros;

  while(qntdZeros > 0) {
    combinacao += '0'
    qntdZeros--
  }

  return combinacao.concat(sku);
}

const combinacoes = []

for (let i = 0; i < orderHookItems.length; i++) {
  let primeiraParte = composeCombinationId(orderHookItems[i].sku.length, orderHookItems[i].sku)

  for (let j = 1 + i; j < orderHookItems.length; j++) {
    let segundaParte = composeCombinationId(orderHookItems[j].sku.length, orderHookItems[j].sku)
    let combinacao = `${primeiraParte}-${segundaParte}`;

    combinacoes.push({
      idCombinacao: combinacao, 
      items: [
        {
        skuId: orderHookItems[i].sku
        },
        {
        skuId: orderHookItems[j].sku
        }
     ]
    })
  }
}

console.log(combinacoes)