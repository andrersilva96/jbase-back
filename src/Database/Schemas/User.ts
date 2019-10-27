import { Document, Schema, Model } from 'mongoose'
import { UserInterface } from '../Interfaces/UserInterface'
import bcrypt from 'bcrypt-nodejs'
import Mongo from '../Mongo'

export interface UserModel extends UserInterface, Document {}

const UserSchema = new Schema({
  email: { type: String, unique: true },
  name: String,
  password: String,
  apiHash: String,
  tables: []
}, {
  timestamps: true
})

UserSchema.pre('save', function save (next) {
  const user = this as UserModel
  if (!user.isModified('password')) return next()
  bcrypt.hash(user.password, bcrypt.genSaltSync(7), null, (err: Error, hash: string) => {
    if (err) { return next(err) }
    user.password = hash
    next()
  })
})

UserSchema.pre('updateOne', function (next) {
  const data = this.getUpdate()
  bcrypt.hash(data.password, bcrypt.genSaltSync(7), null, (err: Error, hash: string) => {
    if (err) { return next(err) }
    data.password = hash
    this.update({}, data).exec()
    next()
  })
})

UserSchema.method('comparePassword', function (password: string): boolean {
  return bcrypt.compareSync(password, this.password)
})

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password
    return ret
  }
})

export const User: Model<UserModel> = Mongo.database().model<UserModel>('User', UserSchema)
