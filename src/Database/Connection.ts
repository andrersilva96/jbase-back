import mongoose, { Mongoose } from 'mongoose'

export default class Connection {
  public static async database (db?: string): Promise<Mongoose> {
    const host = process.env.DB_HOST
    const port = process.env.DB_PORT
    const params = process.env.DB_PARAMS
    // const conn = await mongoose.createConnection(
    const conn = await mongoose.connect(
      `mongodb://${host}:${port}?${params}`,
      {
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD,
        dbName: db || process.env.DB_DATABASE,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )

    return conn
  }
}
