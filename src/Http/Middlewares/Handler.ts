import { Request, Response } from 'express'
import { NextFunction } from 'connect'

export default class Handler {
  public static render (err: Error, req: Request, res: Response, next: NextFunction) :void {
    if (err instanceof SyntaxError) {
      res.status(422).send({ success: false, message: 'JSON with incorrect format.' })
    }

    next()
  }
}
