import {
  NextFunction,
  Request,
  Response,
  Router
} from "express"

import Controller from "@utils/interfaces/controller.interface"
import HttpException from "@utils/exceptions/http.exception"
import isEmpty from "@utils/isEmpty"

import CartService from "@resources/cart/cart.service"


class CartController implements Controller {
  public path = '/cart'
  public router = Router()
  private service = new CartService()

  constructor () {
    this.initRoutes()
  }

  /** Initialize cart routes. */
  private initRoutes = (): void => {
    // Add to cart.
    this.router.post(
      `${this.path}`,
      this.addToCart
    )

    // Get cart.
    this.router.get(
      `${this.path}`,
      this.getCart
    )
  }

  /** Add item to cart. */
  private addToCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      // Get item to add.
      const { item, user } = req.body

      // Initialize cart.
      let cart = null

      // Try getting cart for authenticated user.
      if (!isEmpty(user)) {
        cart = await this.service.getByUser(user)
      }

      // Create cart if not exists.
      if (!cart) {
        cart = this.service.create({
          items: [item],
          ...!isEmpty(user) && {user}
        })

        return res.status(200).send({
          msg: 'Added to cart successfully.',
          ok: true
        })
      }

      // Get index of item in cart.
      const itemIndex = cart.items.findIndex(cartItem => (
        cartItem.product.toString() === item.product
      ))

      // Update cart details or add item to cart.
      if (itemIndex > -1) {
        // Update quantity.
        cart.items[itemIndex].qty += item.qty

        // Update total price.
        cart.items[itemIndex].totalPrice = (
          cart.items[itemIndex].qty * cart.items[itemIndex].purchasePrice
        )

      } else {
        // Add item to cart.
        cart.items.push(item)
      }

      // Save cart.
      cart = await cart.save()

      res.status(200).send({
        msg: 'Added to cart successfully.',
        ok: true,
        cart
      })

    } catch (err: any) {
      next(new HttpException(400, err.message))
    }
  }

  /** Get cart. */
  private getCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      let cart;

      if (req.body.cartId) {
        cart = await this.service.getById(req.body.cartId)
      }

      if (req.body.user) {
        cart = await this.service.getByUser(req.body.user)
      }

      if (!cart) {
        return res.status(404).send({
          msg: 'Cart not found.',
          ok: false
        })
      }

      res.status(200).send({
        cart,
        ok: true
      })

    } catch (err: any) {
      next(new HttpException(400, err.message))
    }
  }
}

export default CartController