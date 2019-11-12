import { Document, Schema, Model } from 'mongoose'
import { UserInterface } from '../Interfaces/UserInterface'
import bcrypt from 'bcrypt-nodejs'
import Mongo from '../Mongo'

export interface UserModel extends UserInterface, Document {}

const UserSchema = new Schema({
  email: { type: String, unique: true },
  name: String,
  apiHash: String,
  tables: []
}, {
  timestamps: true
})

export const User: Model<UserModel> = Mongo.database().model<UserModel>('User', UserSchema)
