const AWS = require('aws-sdk');

const config = require('./config/configAWS');

const tableName = 'combination';

const awsConfig = config;
AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();

// --- Save
async function save(bodyRequest) {
  bodyRequest.quantity = 1; //incremento

  var params = {
    TableName: tableName,
    Item: bodyRequest
  };

  try {
    await dynamodb.put(params).promise();
    return bodyRequest;
  }catch (error) {
    console.log('Erro', error);
    return null
  }
}

// --- Update
async function update(bodyRequest) {
  var params = {
    TableName: tableName,
    Key: { "id": bodyRequest.id },
    UpdateExpression: "set quantity = :quantity",
    ExpressionAttributeValues: {
      ":quantity": bodyRequest.quantity
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const data = await dynamodb.update(params).promise();
    return data;
  } catch(error) {
    console.log('Erro', error);
  }
}

// --- Delete
async function deleteId(id) {
  var params = {
    TableName: tableName,
    Key: {
      id: id
    }
  }

  try {
    await dynamodb.delete(params).promise();
    return true;
  } catch(error) {
    console.log('erro', error);
    return false;
  }
}

module.exports = {
  save,
  update,
  deleteId
}