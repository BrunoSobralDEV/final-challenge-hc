const orderHookItems = [
  { id: "15", "sku": "10" }, 
  { id: "12", sku: "200" }
]

const organizeProducts = async (tableName, docClient) => {
  const params = {
    TableName: tableName
  };

  let scanResults = [];
  let items;

  do {
    items = await docClient.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStarKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey != "undefined");

  return scanResults;
}

module.exports = organizeProducts;