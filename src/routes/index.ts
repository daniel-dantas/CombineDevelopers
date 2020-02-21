import { Router } from 'express'
import UserRoutes from './DevRoutes'
import GroupDevRoutes from './GroupDevRoutes'

const routes = Router()

routes.use('/dev', UserRoutes)
routes.use('/groupdev', GroupDevRoutes)

export default routes
