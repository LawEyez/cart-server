import { Document } from "mongoose";

interface IUser extends Document {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  isCorrectPassword(password: string): Promise<boolean | Error>
}

export default IUser