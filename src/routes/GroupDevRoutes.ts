import { Router } from 'express'
import GroupDevController from '../controllers/GroupDevController'

const routes = Router()

routes.post('/', GroupDevController.create)
routes.get('/', GroupDevController.read)
routes.get('/:projectName', GroupDevController.search)

export default routes