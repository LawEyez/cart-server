import validator from 'validator'

import isEmpty from '@utils/isEmpty'

import IProduct from '@resources/product/product.interface'


/** Product creation validator. */
const create = (data: IProduct) => {
  const errors: any = {}

  /** Format data. */
  const name = isEmpty(data.name) ? '' : data.name
  const price = isEmpty(data.price) ? '' : data.price.toString()
  const description = isEmpty(data.description) ? '' : data.description

  /** Perform checks. */
  if (validator.isEmpty(name)) {
    errors.name = 'Product name is required.'
  }

  if (validator.isEmpty(price)) {
    errors.price = 'Product price is required.'
  }

  if (validator.isEmpty(description)) {
    errors.description = 'Product description is required.'
  }

  return {
    errors, 
    isValid: isEmpty(errors)
  }
}


export default {
  create,
}
