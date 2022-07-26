import {
  NextFunction,
  Request,
  Response,
  Router
} from "express"

import OrderService from "@resources/order/order.service"
import CartService from "@resources/cart/cart.service"
import { ICartItem } from "@resources/cart/cart.interface"

import Controller from "@utils/interfaces/controller.interface"
import HttpException from "@utils/exceptions/http.exception"

import AuthenticatedMiddleware from "@middleware/authenticated.middleware"


class OrderController implements Controller {
  public path = '/orders'
  public router = Router()

  private service = new OrderService()
  private cartService = new CartService()

  constructor () {
    this.initRoutes()
  }

  /** Initialize order routes.  */
  private initRoutes = (): void => {
    // Create order.
    this.router.post(
      `${this.path}`,
      [
        AuthenticatedMiddleware,
        this.create
      ]
    )
  }

  /** Create order. */
  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const data: any = {}

      // Get cart items.
      const cart = await this.cartService.getByUser(req.user.id)
      data.items = cart?.items

      // Calculate item total.
      data.itemTotal = data.items.reduce(
        (total: number, item: ICartItem) => total + item.totalPrice,
        0
      )

      // Add shipping price.
      data.shippingPrice = Number(req.body.shippingPrice) || 0

      // Calculate order total.
      data.total = data.itemTotal + data.shippingPrice

      // Create order. 
      const order = await this.service.create(data)
      
      // Empty cart.
      if (order) {
        await this.cartService.emptyByUser(req.user.id)
      }

      res.status(200).send({
        msg: 'Order created successfully.',
        ok: true,
        order
      })

    } catch (err: any) {
      next(new HttpException(400, err.message))
    }
  }
}

export default OrderController