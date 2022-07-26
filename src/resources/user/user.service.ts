import UserModel from "@resources/user/user.model";
import IUser from "@resources/user/user.interface";

import { createToken } from "@utils/token";


class UserService {
  private user = UserModel

  /** Register new user. */
  public register = async (
    data: IUser
  ): Promise<string> => {
    try {
      // Check if user exists.
      const existingUser = await this.user.findOne({
        email: data.email
      })
  
      if (existingUser) {
        throw new Error('User already registered.')
      }
      
      // Create user.
      const user = await this.user.create(data)
      const accessToken = createToken(user)
  
      return accessToken
      
    } catch (err) {
      throw err
    }
  }

  /** Login user. */
  public login = async (
    email: string,
    password: string
  ): Promise<string | Error> => {
    try {
      // Get user.
      const user = await this.user.findOne({ email })
  
      if (!user) {
        throw new Error('User not found.')
      }
      
      // Verify password.
      if (!(await user.isCorrectPassword(password))) {
        throw new Error('Wrong email and password combination.')
      }
  
      return createToken(user)

    } catch (err) {
      throw err
    }
  }

  /** Get user by id. */
  public getById = async (
    id: string
  ): Promise<IUser> => {
    try {
      const user = await this.user.findById(id)
  
      if (!user) {
        throw new Error('User not found.')
      }

      return user

    } catch (err) {
      throw err
    }
  }
}

export default UserService