import { Request, Response } from 'express'
import { User } from '../../Database/Schemas/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await User.find()

    return res.json(users)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.create(req.body)
      return res.json(user)
    } catch (err) {
      if (err.code === 11000) return res.status(409).json({ success: false, message: 'The user already exists.' })
    }
  }
}

export default new UserController()
