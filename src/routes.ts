import { Router } from 'express'
import UserController from './Http/Controllers/UserController'
import DynamicController from './Http/Controllers/DynamicController'
import AuthController from './Http/Controllers/AuthController'

const routes = Router()

// Application
routes.post('/login', AuthController.login)
routes.post('/users', UserController.insert)
routes.put('/users', AuthController.validToken, UserController.update)
routes.get('/newToken', AuthController.newToken)
routes.use('/generateHash', AuthController.validToken, AuthController.generateHash)

// User Application
routes.use('/dynamic', AuthController.validHash)
routes.post('/dynamic', DynamicController.insertMany)
routes.post('/dynamic/:table', DynamicController.insertOne)
routes.get('/dynamic/:table/:sort?/:page?', DynamicController.list)
routes.delete('/dynamic/:table/:id', DynamicController.remove)
routes.put('/dynamic/:table/:id', DynamicController.update)
routes.delete('/dynamic/:table', DynamicController.drop)

export default routes
