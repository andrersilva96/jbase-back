import mongoose from 'mongoose'

export default class Connection {
  public static async database (db?: string): Promise<void> {
    const host = process.env.DB_HOST
    const port = process.env.DB_PORT
    const params = process.env.DB_PARAMS
    await mongoose.connect(
      `mongodb://${host}:${port}?${params}`,
      {
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD,
        dbName: db || process.env.DB_DATABASE,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
  }
}
