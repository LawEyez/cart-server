import {
  NextFunction,
  Request,
  RequestHandler,
  Response
} from "express"


const validationMiddleware = (validator: any): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { errors, isValid } = validator(req.body)

    if (!isValid) {
      return res.status(400).send({
        errors,
        ok: false
      })
    }

    next()
  }
}

export default validationMiddleware