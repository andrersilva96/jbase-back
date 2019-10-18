import { Request, Response } from 'express'
import { Dynamic } from '../../Database/Schemas/Dynamic'
import { Validate } from '../../Services/ValidateService'
import Connection from '../../Database/Connection'
import * as jwt from 'jsonwebtoken'

class DynamicController {
  public async insertMany (req: Request, res: Response) : Promise<Response> {
    if (!Validate.json(req.body)) {
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

    return res.status(201).json({ success: true, message: 'Record created.' })
  }

  public async insertOne (req: Request, res: Response) : Promise<Response> {
    if (!Validate.json(req.body, true)) {
      return res.status(422).json({ success: false, message: 'Your JSON does not follow the pattern.' })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded : any = jwt.decode(req.headers.authorization)
    Connection.database('records_' + decoded.userId)
    await Dynamic(req.params.table).create(req.body)

    return res.status(201).json({ success: true, message: 'Record created.' })
  }

  public async list (req: Request, res: Response) : Promise<Response> {
    if (Object.keys(req.body).length !== 0 && !Validate.json(req.body, true)) {
      return res.status(422).json({ success: false, message: 'Your JSON does not follow the pattern.' })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded : any = jwt.decode(req.headers.authorization)
    Connection.database('records_' + decoded.userId)

    try {
      const data = await Dynamic(req.params.table).find(req.body)
      if (data.length) {
        return res.status(200).json(data)
      }
    } catch (err) {}
    return res.status(204).json()
  }

  public async remove (req: Request, res: Response) : Promise<Response> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded : any = jwt.decode(req.headers.authorization)
    Connection.database('records_' + decoded.userId)
    const data = await Dynamic(req.params.table).deleteOne({ _id: req.params.id })
    if (data.n === 1) {
      return res.status(200).json({ success: true, message: 'The record has been removed.' })
    }

    return res.status(204).json()
  }

  public async update (req: Request, res: Response) : Promise<Response> {
    if (!Validate.json(req.body, true)) {
      return res.status(422).json({ success: false, message: 'Your JSON does not follow the pattern.' })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded : any = jwt.decode(req.headers.authorization)
    Connection.database('records_' + decoded.userId)
    await Dynamic(req.params.table).updateOne({ _id: req.params.id }, req.body)

    return res.status(200).json({ success: true, message: 'The record has been updated.' })
  }
}

export default new DynamicController()
