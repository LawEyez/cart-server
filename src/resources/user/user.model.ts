import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

import IUser from '@resources/user/user.interface'


/** User Schema */
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },

    lastName: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
)

/** Hash password before saving. */
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

/** Password comparison. */
UserSchema.methods.isCorrectPassword = async function (
  password: string
): Promise<boolean | Error> {
  return await bcrypt.compare(password, this.password)
}

export default model<IUser>('User', UserSchema)