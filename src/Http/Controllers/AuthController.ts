import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { User } from '../../Database/Schemas/User'

class AuthController {
  public async login (req: Request, res: Response) : Promise<Response> {
    const data = req.body
    const user = await User.findOne({ email: data.email })

    if (!user.comparePassword(data.password)) return res.status(401).json({ success: false })

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return res.status(200).send({ success: true, token: token })
  };

  public async validToken (req: Request, res: Response, next: NextFunction) : Promise<Response> {
    try {
      jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
      next()
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Token expired.' })
    }
  }

  public async newToken (req: Request, res: Response) : Promise<Response> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded : any = jwt.decode(req.headers.authorization, { complete: true })
    const token = jwt.sign(
      { userId: decoded.payload.userId },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return res.status(200).send({ success: true, token: token })
  }
}

export default new AuthController()
