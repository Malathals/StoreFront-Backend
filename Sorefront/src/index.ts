const express = require('express');
const bodyParser = require('body-parser');
import { productRoutes } from './handler/productRoutes';

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

productRoutes(app);

app.listen(port, () => {
  console.log('i am listen to this port', port);
});
