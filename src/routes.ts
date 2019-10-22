import { Router } from 'express'
import UserController from './Http/Controllers/UserController'
import DynamicController from './Http/Controllers/DynamicController'
import AuthController from './Http/Controllers/AuthController'

const routes = Router()

routes.post('/login', AuthController.login)
routes.get('/newToken', AuthController.newToken)
routes.post('/users', UserController.insert)

routes.use('/users', AuthController.validToken)
routes.put('/users/:id', UserController.update)

routes.use('/dynamic', AuthController.validToken)
routes.post('/dynamic', DynamicController.insertMany)
routes.post('/dynamic/:table', DynamicController.insertOne)
routes.get('/dynamic/:table', DynamicController.list)
routes.delete('/dynamic/:table/:id', DynamicController.remove)
routes.put('/dynamic/:table/:id', DynamicController.update)

export default routes
