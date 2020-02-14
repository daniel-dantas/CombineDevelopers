import { Router } from 'express'
import UserRoutes from './UserRoutes'

const routes = Router()

routes.use('/users', UserRoutes)

export default routes
