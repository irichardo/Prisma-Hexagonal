import { Router } from 'express'
import { findConversationByIdController } from '../../infrastructure/adapters/Output/controllers/message.controller'
import { sendMessageController } from '../../infrastructure/adapters/Input/controllers/conversationControllers/sendMessageController'

const router = Router()

router.post('/', sendMessageController)
router.get('/', findConversationByIdController)

export default router
