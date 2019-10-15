import { Router } from 'express'
import UserController from './Http/Controllers/UserController'
import DynamicController from './Http/Controllers/DynamicController'
import AuthController from './Http/Controllers/AuthController'

const routes = Router()

routes.post('/login', AuthController.login)
routes.get('/newToken', AuthController.newToken)
routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

routes.use('/dynamic/', AuthController.validToken)
routes.post('/dynamic/insert', DynamicController.store)
routes.get('/dynamic/:table', DynamicController.list)
routes.delete('/dynamic/:table/:id', DynamicController.remove)

export default routes
