/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { User } from '../../Database/Schemas/User'
import * as jwt from 'jsonwebtoken'

class UserController {
  public async getUser (req: Request, res: Response): Promise<Response> {
    const decoded : any = jwt.decode(req.headers.authorization)
    const user: any = await User.findById(decoded.userId)

    return res.json({ success: true, data: user })
  }
}

export default new UserController()
