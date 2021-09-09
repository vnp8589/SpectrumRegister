const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./route');
const { config: { port } } = require('./commons/config');
const jwt = require('./commons/jwt');
const cors = require('cors');

require('./commons/dbConnection');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(jwt());
app.use(routes);

app.listen(port, async (err) => {
  if (err) throw err;
  console.log(`Server is running on ${port}`);
})

module.exports = app;