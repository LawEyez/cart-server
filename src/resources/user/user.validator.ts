import validator from 'validator'

import isEmpty from '@utils/isEmpty'

import IUser from '@resources/user/user.interface'


/** User registration validator. */
const register = (data: IUser) => {
  const errors: any = {}

  /** Format data. */
  const firstName = isEmpty(data.firstName) ? '' : data.firstName
  const lastName = isEmpty(data.lastName) ? '' : data.lastName
  const email = isEmpty(data.email) ? '' : data.email
  const password = isEmpty(data.password) ? '' : data.password

  /** Perform checks. */
  if (validator.isEmpty(firstName)) {
    errors.firstName = 'First name is required.'
  }

  if (validator.isEmpty(lastName)) {
    errors.lastName = 'Last name is required.'
  }

  if (validator.isEmpty(email)) {
    errors.email = 'User email is required.'
  }

  if (validator.isEmpty(password)) {
    errors.password = 'User password is required.'
  }

  return {
    errors, 
    isValid: isEmpty(errors)
  }
}

/** User login validator. */
const login = (data: IUser) => {
  const errors: any = {}

  /** Format data. */
  const email = isEmpty(data.email) ? '' : data.email
  const password = isEmpty(data.password) ? '' : data.password

  /** Perform checks. */
  if (validator.isEmpty(email)) {
    errors.email = 'User email is required.'
  }

  if (validator.isEmpty(password)) {
    errors.password = 'User password is required.'
  }

  return {
    errors, 
    isValid: isEmpty(errors)
  }
}


export default {
  register,
  login
}
