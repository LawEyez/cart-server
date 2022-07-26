import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

import Token from "@utils/interfaces/token.interface";
import HttpException from "@utils/exceptions/http.exception";
import { verifyToken } from "@utils/token";


/** Ensure user is authenticated. */
const authenticatedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    // Get authorization header.
    const auth = req.headers.authorization

    if (!auth) {
      return next(
        new HttpException(401, 'Please log in to continue.')
      )
    }

    // Get token.
    const token = auth.split(' ')[1]

    // Try getting payload.
    const payload: Token | JsonWebTokenError = await verifyToken(token)

    if (payload instanceof JsonWebTokenError) {
      return next(
        new HttpException(401, 'Please log in to continue.')
      )
    }

    // Add user to request object.
    req.user = payload

    next()

  } catch (err) {
    next(new HttpException(401, 'Please log in to continue.'))
  }
}

export default authenticatedMiddleware