# AWS API

## Consumindo a API

Endpoints:

GET: [https://3jfc0467k2.execute-api.us-east-1.amazonaws.com/compra](https://3jfc0467k2.execute-api.us-east-1.amazonaws.com/compra)

POST: [https://k30cnnmuxj.execute-api.us-east-1.amazonaws.com/createOrUpdate/combinationCreateOrUpdate](https://k30cnnmuxj.execute-api.us-east-1.amazonaws.com/createOrUpdate/combinationCreateOrUpdate)

### GET /compra

Parâmetros:

`id`: ID de uma combinação já registrada no banco de dados;

`sku`: SKU do produto que se busca obter combinações

### Exemplos:

- **Obter uma combinação já registrada**

**Request**: GET /compra?id=67-79

**Response:**

```json
{
  "id": "67-79",
  "skus": [
    {
      "quantitySku": 28,
      "skuId": "67"
    },
    {
      "quantitySku": 30,
      "skuId": "79"
    }
  ],
  "quantity": 28
}
```

- **Obter combinações para um produto**

**Request:** GET /compra?sku=67

**Response:**

```json
[
  {
    "id": "67-79",
    "skus": [
      {
        "quantitySku": 28,
        "skuId": "67"
      },
      {
        "quantitySku": 30,
        "skuId": "79"
      }
    ],
    "quantity": 28
  },
  {
    "id": "58-67",
    "skus": [
      {
        "quantitySku": 15,
        "skuId": "67"
      },
      {
        "quantitySku": 12,
        "skuId": "58"
      }
    ],
    "quantity": 12
  }
]
```

- **Obter todas as combinações já registradas**

**Request:** GET /compra

**Response:**

```json
[
  {
    "id": "67-79",
    "skus": [...],
    "quantity": 7
  },
  {
    "id": "58-67",
    "skus": [...],
    "quantity": 8
  },
	{
    "id": "25-58",
    "skus": [...],
    "quantity": 25
  },
  ...
]
```

### POST /createOrUpdate/combinationCreateOrUpdate

Obs.: requisição feita automaticamente após a criação de um pedido na loja. Os itens do pedido são enviados à AWS para o processamento das combinações e armazenamento no DynamoDB.

### Exemplo:

**Request:** POST /createOrUpdate/combinationCreateOrUpdate

body:

```json
{
  "type": "order-created",
  "items": [
    {
      "sellerSku": "63",
      "quantity": 1
    },
    {
      "sellerSku": "67",
      "quantity": 1
    }
  ]
}
```

**Response:**

```json
{
  "body": "Successfully created item!"
}
```

Obs.: Caso a combinação não exista será criado um id único com base no skuSeller. Usando o body acima o “id” fica assim: 63-67. Independente da ordem ele sempre vai deixar do menor para o maior em relação ao primeiro número da parte inteira.

**Exemplo body:**

```json
{
  "type": "order-created",
  "items": [
    {
      "sellerSku": "5",
      "quantity": 1
    },
    {
      "sellerSku": "107",
      "quantity": 1
    }
  ]
}
```

Dessa forma como o primeiro número da parte inteira ficaria assim com o “id” fica 5-107.

Caso o id da combinação já exista na tabela do dynamoDB. Então ele vai somar quantity anterior com a quantity atual de cada item. E ao final na atualização do produto ele vai aparecer a seguinte mensagem:

**Response:**

```json
{
  "body": "Successfully updated item!"
}
```

No dynamoDB também adicionamos uma quantity geral para cada combinação, assim é possível saber a quantidade de vezes que foram feitos as combinações. Ao criar uma nova id de combinação automaticamente o valor de quantity fica 1 e toda vez em que a API POST/COMPRA for usada e já tiver um, vai ser somado +1 em quantity. No final a estrutura JSON do dynamoDB fica assim:

```json
{
  "id": {
    "S": "150-59"
  },
  "quantity": {
    "N": "2"
  },
  "skus": {
    "L": [
      {
        "M": {
          "quantitySku": {
            "N": "7"
          },
          "skuId": {
            "S": "150"
          }
        }
      },
      {
        "M": {
          "quantitySku": {
            "N": "8"
          },
          "skuId": {
            "S": "59"
          }
        }
      }
    ]
  }
}
```

### Pedidos Cancelados

### POST /createOrUpdate/combinationCreateOrUpdate

Observamos também pedidos que são cancelados e atualizamos a base de dados na AWS. É verificado o “id” da combinação e então é subtraído -1 de quantity e subtraído o valor de cada quantitySku.

**Request:** POST /createOrUpdate/combinationCreateOrUpdate

body:

```json
{
  "type": "request-cancel",
  "items": [
    {
      "sellerSku": "63",
      "quantity": 1
    },
    {
      "sellerSku": "67",
      "quantity": 1
    }
  ]
}
```

**Response:**

```json
{
  "body": "Success in subtracting the canceled items!"
}
```
