const aws = require('aws-sdk');
const express = require('express');

const config = require('./config/configAWS');
const { save } = require('./Crud');
const routes = require('./routes');

const awsConfig = config;
aws.config.update(awsConfig);

const app = express();
app.use(express.json());

app.use(routes);

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));