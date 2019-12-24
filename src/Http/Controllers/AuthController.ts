/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { User } from '../../Database/Schemas/User'
import { UserService } from '../../Services/UserService'
import { FirebaseService } from '../..//Services/FirebaseService'

class AuthController {
  public async login (req: Request, res: Response) : Promise<Response> {
    try {
      const data = await FirebaseService.getUser(req.headers.authorization)
      const user = await UserService.create(data)
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '31d' }
      )

      return res.status(200).send({ success: true, token: token })
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Firebase token invalid.' })
    }
  }

  public async validToken (req: Request, res: Response, next: NextFunction) : Promise<Response> {
    try {
      jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
      next()
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Token expired.' })
    }
  }

  public async newToken (req: Request, res: Response) : Promise<Response> {
    const decoded : any = jwt.decode(req.headers.authorization)
    const token = jwt.sign(
      { userId: decoded.userId, apiHash: decoded.apiHash ? decoded.apiHash : false },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return res.status(200).send({ success: true, token: token })
  }

  public async generateHash (req: Request, res: Response) : Promise<Response> {
    const decoded : any = jwt.decode(req.headers.authorization)
    const hash = Math.floor(Date.now() / 1000) + Math.random().toString(36).slice(-8)
    const user = await User.findById(decoded.userId)
    user.apiHash = hash
    await user.save()
    const token = jwt.sign(
      { userId: decoded.userId, apiHash: hash },
      process.env.JWT_SECRET
    )
    return res.status(200).send({ success: true, token: token })
  }

  public async validHash (req: Request, res: Response, next: NextFunction) : Promise<Response> {
    try {
      jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
      const decoded : any = jwt.decode(req.headers.authorization)
      const user = await User.findById(decoded.userId)

      if (!decoded.apiHash || user.apiHash !== decoded.apiHash) {
        return res.status(401).json({ success: false, message: 'Token invalid.' })
      }

      next()
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Token expired.' })
    }
  }
}

export default new AuthController()
