import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import routes from './routes'
import Handler from './Http/Middlewares/Handler'
import Connection from './Database/Connection'

export default class App {
  public express: express.Application

  public constructor () {
    // Setup
    dotenv.config()
    this.express = express()
    this.express.use(express.json())
    this.express.use(cors())

    // Middlewares
    this.express.use(Handler.render)

    // Database
    Connection.database()

    // Routes
    this.express.use(routes)
  }
}
