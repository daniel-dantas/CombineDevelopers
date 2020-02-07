import { Router } from 'express'
import User from './controllers/UserController'

const routes = Router()

routes.post('/users', User.create)
routes.get('/users', User.read)
routes.delete('/users', User.delete)
routes.put('/users', User.update)

export default routes
