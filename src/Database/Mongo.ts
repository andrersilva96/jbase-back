import mongoose, { Connection } from 'mongoose'
import * as dotenv from 'dotenv'

export default class Mongo {
  public static database (db?: string): Connection {
    dotenv.config()

    const host = process.env.DB_HOST
    const port = process.env.DB_PORT
    const params = process.env.DB_PARAMS
    db = db || process.env.DB_DATABASE
    const conn = mongoose.createConnection(
      `mongodb://${host}:${port}/${db}${params}`,
      {
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )

    return conn
  }
}
