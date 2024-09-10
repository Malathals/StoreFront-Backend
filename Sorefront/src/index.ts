const express = require('express');
const bodyParser = require('body-parser');
import { productRoutes } from './handler/productRoutes';
import {userRoutes} from './handler/usersRoutes'

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

productRoutes(app);
userRoutes(app)

app.listen(port, () => {
  console.log('i am listen to this port', port);
});
