import express from 'express';
import bodyParser from 'body-parser';
import { productRoutes } from './handler/productRoutes';
import { userRoutes } from './handler/usersRoutes';
import { orderRoutes } from './handler/orderRouter';

export const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());

productRoutes(app);
userRoutes(app);
orderRoutes(app);

app.listen(port, () => {
  console.log('i am listen to this port', port);
});
