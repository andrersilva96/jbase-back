/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { User } from '../../Database/Schemas/User'
import * as jwt from 'jsonwebtoken'

class UserController {
  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const decoded : any = jwt.decode(req.headers.authorization)
      await User.updateOne({ _id: decoded.userId }, req.body)
      return res.json({ success: true, message: 'The user has been updated.' })
    } catch (err) {
      if (err.code === 11000) return res.status(409).json({ success: false, message: 'The user already exists.' })
    }
  }
}

export default new UserController()
