import ProductModel from "@resources/product/product.model";
import IProduct from "@resources/product/product.interface";


class ProductService {
  private product = ProductModel

  /** Create a new product. */
  create = async (
    data: IProduct
  ): Promise<IProduct> => {
    try {
      const product = await this.product.create(data)
      return product

    } catch (err) {
      throw new Error('Failed to create product.')
    }
  }

  /** List products. */
  list = async (
    page: number,
    limit: number
  ): Promise<IProduct[]> => {
    try {
      const products = await this.product
        .find()
        .limit(limit)
        .skip(limit * page)

      return products

    } catch (err) {
      throw new Error('Failed to list products.')
    }
  }
}

export default ProductService