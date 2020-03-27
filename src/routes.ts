import { Router } from 'express'
import UserController from './Http/Controllers/UserController'
import DynamicController from './Http/Controllers/DynamicController'
import AuthController from './Http/Controllers/AuthController'

const routes = Router()

// Application
routes.post('/login', AuthController.login)
routes.get('/user', AuthController.validToken, UserController.getUser)
routes.get('/newToken', AuthController.newToken)
routes.get('/generateToken', AuthController.validToken, AuthController.generateToken)
routes.post('/addTable', AuthController.validToken, DynamicController.addTable)
routes.delete('/removeTable', AuthController.validToken, DynamicController.removeTable)

// User Application
routes.use('/dynamic', AuthController.validHash)
routes.post('/dynamic', DynamicController.insertMany)
routes.post('/dynamic/:table', DynamicController.insertOne)
routes.get('/dynamic/:table/:sort?/:page?', DynamicController.list)
routes.delete('/dynamic/:table/:id', DynamicController.remove)
routes.put('/dynamic/:table/:id', DynamicController.update)

export default routes
