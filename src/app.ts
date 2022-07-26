import express, { Application } from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import compression from 'compression'
import 'dotenv/config'

import Controller from '@utils/interfaces/controller.interface'

import ErrorMiddleware from '@middleware/error.middleware'


class App {
  public express: Application
  public port: number

  constructor (controllers: Controller[], port: number) {
    this.express = express()
    this.port = port

    this.initConnectDb()
    this.initMiddleware()
    this.initControllers(controllers)
    this.initErrorHandling()
  }

  /** Connect to database */
  private initConnectDb(): void {
    const { MONGO_URI } = process.env

    mongoose.connect(MONGO_URI as string)
      .then(() => console.log('MongoDB connected...'))
  }

  /** Initialize middlewares */
  private initMiddleware(): void {
    this.express.use(helmet())
    this.express.use(cors())
    this.express.use(morgan('dev'))
    this.express.use(compression())
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: false }))
  }

  /** Setup controllers */
  private initControllers(controllers: Controller[]): void {
    for (const controller of controllers) {
      this.express.use('/api', controller.router)
    }
  }

  /** Add error handling */
  private initErrorHandling(): void {
    this.express.use(ErrorMiddleware)
  }

  /** Start server. */
  public start(): void {
    this.express.listen(this.port, () => {
      console.log(`Server running on localhost:${this.port}`)
    })
  }
}

export default App