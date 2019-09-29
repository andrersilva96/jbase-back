import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import routes from './routes'

class App {
  public express: express.Application

  public constructor () {
    dotenv.config()
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private async database (): Promise<void> {
    const host = process.env.DB_HOST
    const port = process.env.DB_PORT
    const params = process.env.DB_PARAMS
    mongoose.connect(
      `mongodb://${host}:${port}?${params}`,
      {
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD,
        dbName: process.env.DB_DATABASE,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
