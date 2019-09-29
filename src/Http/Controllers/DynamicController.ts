import { Request, Response } from 'express'
import { Dynamic } from '../../Database/Schemas/Dynamic'
import { Validate } from '../../Services/ValidateService'

class DynamicController {
  public async store (req: Request, res: Response) : Promise<Response> {
    for (const obj in req.body) {
      await Dynamic(obj).insertMany(req.body[obj], (err, doc) => {
        if (err) return res.status(400).json(err)
      })
    }

    return res.status(201).json({ message: 'The table has been created.' })
  }
}

export default new DynamicController()
