import jwt from 'jsonwebtoken'

import IUser from "@resources/user/user.interface";

import Token from "@utils/interfaces/token.interface";


/** Create token. */
export const createToken = (user: IUser): string => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      firstName: user.firstName
    },
    process.env.JWT_SECRET as jwt.Secret,
    { expiresIn: '1d' }
  )
}

/** Verify token. */
export const verifyToken = async (
  token: string
): Promise<Token | jwt.VerifyErrors> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET as jwt.Secret,
      (err, payload) => {
        if (err) return reject(err)

        resolve(payload as Token)
      }
    )
  })
}