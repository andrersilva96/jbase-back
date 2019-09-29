import { Router } from 'express'
import UserController from './Http/Controllers/UserController'
import DynamicController from './Http/Controllers/DynamicController'

const routes = Router()

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)
routes.post('/insert', DynamicController.store)

export default routes
