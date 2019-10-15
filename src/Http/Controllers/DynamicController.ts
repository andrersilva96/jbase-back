import { Request, Response } from 'express'
import { Dynamic } from '../../Database/Schemas/Dynamic'
import { Validate } from '../../Services/ValidateService'
import Connection from '../../Database/Connection'
import * as jwt from 'jsonwebtoken'

class DynamicController {
  public async store (req: Request, res: Response) : Promise<Response> {
    if (Validate.json(req.body, true)) {
      return res.status(422).json({ success: false, message: 'Your JSON does not follow the pattern.' })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded : any = jwt.decode(req.headers.authorization)
    Connection.database('records_' + decoded.userId)

    for (const obj in req.body) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await Dynamic(obj).insertMany(req.body[obj], (err, doc) => {
        if (err) return res.status(400).json({ success: false, message: 'An error has occurred.' })
      })
    }

    return res.status(201).json({ message: 'The table has been created.' })
  }

  public async list (req: Request, res: Response) : Promise<Response> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded : any = jwt.decode(req.headers.authorization)
    Connection.database('records_' + decoded.userId)

    const data = await Dynamic(req.params.table).find()
    return res.status(200).json(data)
  }
}

export default new DynamicController()
