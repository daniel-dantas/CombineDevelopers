import { Router } from 'express'
import User from '../controllers/DevController'

const routes = Router()

routes.post('/', User.create)
routes.get('/', User.read)
routes.delete('/', User.delete)
routes.put('/', User.update)
routes.get('/:github_username', User.search)

export default routes