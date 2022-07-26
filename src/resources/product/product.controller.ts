import {
  NextFunction,
  Request,
  Response,
  Router
} from "express";

import Controller from "@utils/interfaces/controller.interface";
import HttpException from "@utils/exceptions/http.exception";

import validationMiddleware from "@middleware/validation.middleware";

import ProductService from "@resources/product/product.service";
import ProductValidator from "@resources/product/product.validator";


class ProductController implements Controller {
  public path = '/products'
  public router = Router()
  private service = new ProductService()

  constructor () {
    this.initRoutes()
  }

  /** Initialize product routes. */
  private initRoutes = (): void => {
    // Post new product.
    this.router.post(
      `${this.path}`,
      [
        validationMiddleware(ProductValidator.create),
        this.create
      ]
    )

    // List products.
    this.router.get(
      `${this.path}`,
      this.list
    )
  }

  /** Create new product. */
  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const product = await this.service.create(req.body)
  
      res.status(200).send({
        product,
        ok: true
      })

    } catch (err: any) {
      next(new HttpException(400, err.message))
    }
  }

  /** List all products. */
  private list = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      // Get page and limit.
      const page = (req.query && req.query.page) ? Number(req.query.page) : 0
      const limit = (req.query && req.query.limit) ? Number(req.query.limit) : 10 

      // Get products.
      const products = await this.service.list(page, limit)

      res.status(200).send({
        products,
        ok: true
      })

    } catch (err: any) {
      next(new HttpException(400, err.message))
    }
  }
}


export default ProductController