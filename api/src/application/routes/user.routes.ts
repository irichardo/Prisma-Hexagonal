import { Router } from 'express'
import { addFriendController, createUserController, findUserByIdController, getAllUsers } from '../../infrastructure/adapters/Input/controllers/index'
import { loginController } from '../../infrastructure/adapters/Input/controllers/loginController'
import { autoLoginController } from '../../infrastructure/adapters/Input/controllers/autoLoginController'
import { logoutController } from '../../infrastructure/adapters/Input/controllers/logoutController'

const router = Router()
router.get('/', getAllUsers)
router.post('/', createUserController)
router.post('/login', loginController)
router.get('/logout', logoutController)
router.post('/refresh_token', autoLoginController)
router.get('/:id', findUserByIdController)
router.post('/addFriend', addFriendController)

export default router
