/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { Dynamic } from '../../Database/Schemas/Dynamic'
import { ValidateService } from '../../Services/ValidateService'
import * as jwt from 'jsonwebtoken'
import { User } from '../../Database/Schemas/User'

class DynamicController {
  public async addTable (req: Request, res: Response) : Promise<Response> {
    const decoded : any = jwt.decode(req.headers.authorization)
    const user: any = await User.findById(decoded.userId)

    if (user.tables.length > 10) {
      return res.status(200).json({ success: false, message: 'You have many tables, try to let at least 10.' })
    }

    if (!user.tables.includes(req.body.table)) {
      user.tables.push(req.body.table)
      await user.save()
      return res.status(201).json({ success: true, message: 'Table created.' })
    }

    return res.status(200).json({ success: false, message: 'The table already exists.' })
  }

  public async insertMany (req: Request, res: Response) : Promise<Response> {
    if (!ValidateService.json(req.body)) {
      return res.status(422).json({ success: false, message: 'Your JSON does not follow the pattern.' })
    }

    const decoded : any = jwt.decode(req.headers.authorization)
    const user = await User.findById(decoded.userId)
    if (!user.tables.includes(req.params.table)) {
      return res.status(422).json({ success: false, message: 'Table does not exists.' })
    }

    for (const obj in req.body) {
      await Dynamic('records_' + decoded.userId, obj).insertMany(req.body[obj], (err) => {
        if (err) return res.status(400).json({ success: false, message: 'An error has occurred.' })
      })
    }

    return res.status(201).json({ success: true, message: 'Record created.' })
  }

  public async insertOne (req: Request, res: Response) : Promise<Response> {
    if (!ValidateService.json(req.body, true)) {
      return res.status(422).json({ success: false, message: 'Your JSON does not follow the pattern.' })
    }

    const decoded : any = jwt.decode(req.headers.authorization)
    const user = await User.findById(decoded.userId)
    if (!user.tables.includes(req.params.table)) {
      return res.status(422).json({ success: false, message: 'Table does not exists.' })
    }

    await Dynamic('records_' + decoded.userId, req.params.table).create(req.body)

    return res.status(201).json({ success: true, message: 'Record created.' })
  }

  public async list (req: Request, res: Response) : Promise<Response> {
    if (Object.keys(req.body).length !== 0 && !ValidateService.json(req.body, true)) {
      return res.status(422).json({ success: false, message: 'Your JSON does not follow the pattern.' })
    }

    const decoded : any = jwt.decode(req.headers.authorization)

    try {
      const perPage = 10
      const currentPage = Math.max(0, parseInt(req.params.page) - 1 || 0)
      const data = await Dynamic('records_' + decoded.userId, req.params.table)
        .find(req.body)
        .limit(perPage)
        .skip(perPage * currentPage)
        .sort({ _id: req.params.sort })

      const count = await Dynamic('records_' + decoded.userId, req.params.table)
        .countDocuments(req.body)

      if (data.length) {
        return res.status(200).json({
          success: true,
          total: count,
          perPage: perPage,
          currentPage: currentPage + 1,
          lastPage: Math.round(count / perPage) + 1,
          data: data
        })
      }
    } catch (err) {}
    return res.status(204).json()
  }

  public async remove (req: Request, res: Response) : Promise<Response> {
    const decoded : any = jwt.decode(req.headers.authorization)
    const data = await Dynamic('records_' + decoded.userId, req.params.table).deleteOne({ _id: req.params.id })
    if (data.n === 1) {
      return res.status(200).json({ success: true, message: 'The record has been removed.' })
    }

    return res.status(204).json()
  }

  public async update (req: Request, res: Response) : Promise<Response> {
    if (!ValidateService.json(req.body, true)) {
      return res.status(422).json({ success: false, message: 'Your JSON does not follow the pattern.' })
    }

    const decoded : any = jwt.decode(req.headers.authorization)
    await Dynamic('records_' + decoded.userId, req.params.table).updateOne({ _id: req.params.id }, req.body)

    return res.status(200).json({ success: true, message: 'The record has been updated.' })
  }

  public async drop (req: Request, res: Response) : Promise<Response> {
    const decoded : any = jwt.decode(req.headers.authorization)
    await Dynamic('records_' + decoded.userId, req.params.table).collection.drop()
    return res.status(200).json({ success: true, message: 'The table has been dropped.' })
  }
}

export default new DynamicController()
