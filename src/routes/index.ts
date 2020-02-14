import { Router } from 'express'
import UserRoutes from './UserRoutes'
import GroupDevRoutes from './GroupDevRoutes'

const routes = Router()

routes.use('/users', UserRoutes)
routes.use('/groupdev', GroupDevRoutes)

export default routes
