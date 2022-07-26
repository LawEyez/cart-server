import {
  NextFunction,
  Request,
  Response,
  Router
} from "express";

import Controller from "@utils/interfaces/controller.interface";
import HttpException from "@utils/exceptions/http.exception";

import UserService from "@resources/user/user.service";
import UserValidator from "@resources/user/user.validator";

import validationMiddleware from "@middleware/validation.middleware";


class UserController implements Controller {
  public path = '/users'
  public router = Router()
  private service = new UserService()

  constructor () {
    this.initRoutes()
  }

  /** Initialize user routes. */
  private initRoutes = (): void => {
    // Register.
    this.router.post(
      `${this.path}`,
      [
        validationMiddleware(UserValidator.register),
        this.register
      ]
    )

    // Login.
    this.router.post(
      `${this.path}/login`,
      [
        validationMiddleware(UserValidator.login),
        this.login
      ]
    )
  }

  /** Register user. */
  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const accessToken = await this.service.register(req.body)

      res.status(200).send({
        accessToken,
        ok: true
      })

    } catch (err: any) {
      next(new HttpException(400, err.message))
    }
  }

  /** Login user. */
  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body

      const accessToken = await this.service.login(email, password)

      res.status(200).send({
        accessToken,
        ok: true
      })

    } catch (err: any) {
      next(new HttpException(400, err.message))
    }
  }
}

export default UserController