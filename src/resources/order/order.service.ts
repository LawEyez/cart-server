import OrderModel from "@resources/order/order.model";
import IOrder from "@resources/order/order.interface";


class OrderService {
  private order = OrderModel

  /** Create order. */
  public create = async (
    data: any
  ): Promise<IOrder> => {
    try {
      const order = await this.order.create(data)
      return order

    } catch (err) {
      throw err
    }
  }
}

export default OrderService