import { Document, Schema, Model, model } from 'mongoose'

const DynamicSchema = new Schema({}, { strict: false, versionKey: false })

export const Dynamic = (collection:string): Model<Document> => {
  return model<Document>(collection, DynamicSchema)
}
