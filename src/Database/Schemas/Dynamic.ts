import { Document, Schema, Model } from 'mongoose'
import Mongo from '../Mongo'

const DynamicSchema = new Schema({}, { strict: false, versionKey: false })

export const Dynamic = (schema:string, collection:string): Model<Document> => {
  return Mongo.database(schema).model<Document>(collection, DynamicSchema)
}
