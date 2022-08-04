const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');

const { save, update, deleteId } = require('./Crud');
const scanTable = require('./scanTable');
const config = require('./config/configAWS');

const awsConfig = config;
aws.config.update(awsConfig);

function ifRequestBody(request) {
  return request.body
}


router.get('/combination-itens', (req, res) => {
  const tableName = 'carrinho';
  const docClient = new aws.DynamoDB.DocumentClient();

  scanTable(tableName, docClient).then(array => {
    console.log(array.length)
    return res.json(array);
  });
});

router.post('/combination-itens', async (req, res) => {
  if (req.body.id) {
    const cadastro = await save(req.body)
    return res.send(cadastro);
  }

  return res.status(500).json({ mensagem: "Pedido não cadastrado"})
})

router.put('/combination-itens', async (req, res) => {
  if (ifRequestBody(req)) {
    const data = await update(req.body);
    return res.send(data);
  }

  return res.status(404).json({ message: 'Invalid data'});
})

router.delete('/combination-itens', async (req, res) => {
  if(ifRequestBody(req)) {
    const success = await deleteId(req.body.id);
    return res.send({success: success});
  }

  return res.status(404).json({message: 'Invalid data'})
});

module.exports = router;