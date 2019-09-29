import { Document, Schema, Model, model } from 'mongoose'
import { UserInterface } from '../Interfaces/UserInterface'

export interface UserModel extends UserInterface, Document {}

const UserSchema = new Schema({
  email: String,
  name: String
}, {
  timestamps: true
})

export const User: Model<UserModel> = model<UserModel>('User', UserSchema)
