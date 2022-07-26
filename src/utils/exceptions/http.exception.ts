class HttpException extends Error {
  public status: number
  public message: string

  constructor (status: number, msg: string) {
    super(msg)
    
    this.status = status
    this.message = msg
  }
}

export default HttpException