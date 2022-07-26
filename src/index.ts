import 'dotenv/config'
import 'module-alias/register'

import App from './app';

import UserController from '@resources/user/user.controller';
import ProductController from '@resources/product/product.controller';
import CartController from '@resources/cart/cart.controller';
import OrderController from '@resources/order/order.controller';


// Create server.
const app = new App(
  [
    new UserController(),
    new ProductController(),
    new CartController(),
    new OrderController(),
  ],
  Number(process.env.PORT)
)

app.start()