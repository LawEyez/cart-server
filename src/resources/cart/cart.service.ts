import { Schema } from "mongoose";

import { Cart } from "@resources/cart/cart.model";
import { IBodyCart, ICart } from "@resources/cart/cart.interface";


class CartService {
  private cart = Cart

  /** Create a new cart. */
  public create = async (
    data: IBodyCart
  ): Promise<ICart> => {
    try { 
      const cart = await this.cart.create(data)
      return cart

    } catch (err) {
      throw new Error('Failed to create cart.')
    }
  }

  /** Get a cart by user. */
  public getByUser = async (
    userId: Schema.Types.ObjectId | string
  ): Promise<ICart | null> => {
    try {
      const cart = await this.cart.findOne({ user: userId })
      return cart

    } catch (err) {
      throw err
    }
  } 

  /** Get a cart by id. */
  public getById = async (
    id: Schema.Types.ObjectId | string
  ): Promise<ICart | null> => {
    try {
      const cart = await this.cart.findById(id)
      return cart

    } catch (err) {
      throw err
    }
  } 

  /** Update a cart. */
  public update = async (
    id: string,
    data: ICart
  ): Promise<ICart | null> => {
    try {
      const cart = await this.cart.findByIdAndUpdate(id, data)
      return cart

    } catch (err) {
      throw new Error('Failed to update cart.')
    }
  }

  /** Empty cart by user. */
  public emptyByUser = async (
    userId: Schema.Types.ObjectId | string
  ): Promise<ICart | null> => {
    try {
      const cart = await this.cart.findOneAndUpdate(
        { user: userId },
        { items: [] },
        { new: true }
      )

      return cart

    } catch (err) {
      throw new Error('Failed to empty cart by user.')
    }
  }
}

export default CartService