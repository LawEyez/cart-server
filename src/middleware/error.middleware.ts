import { NextFunction, Request, Response } from "express"

import HttpException from "@utils/exceptions/http.exception"


const errorMiddleware = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500
  const msg = err.message || 'Internal server error occurred.'

  res.status(status).send({
    msg,
    ok: false
  })
}

export default errorMiddleware