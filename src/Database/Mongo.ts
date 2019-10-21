import mongoose, { Mongoose, Connection } from 'mongoose'
import * as dotenv from 'dotenv'

// https://brianflove.com/2016/11/11/typescript-2-express-mongoose-mocha-chai/
export default class Mongo {
  public static database (db?: string): Connection {
    dotenv.config()

    const host = process.env.DB_HOST
    const port = process.env.DB_PORT
    const params = process.env.DB_PARAMS
    db = db || process.env.DB_DATABASE
    console.log(`mongodb://${host}:${port}/${db}${params}`)
    const conn = mongoose.createConnection(
    // const conn = await mongoose.connect(
      `mongodb://${host}:${port}/${db}${params}`,
      {
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD,
        // dbName: db || 'local',
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )

    return conn
  }
}
