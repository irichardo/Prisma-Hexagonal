import { Router } from 'express'
import { findConversationByIdController } from '../../infrastructure/adapters/Output/controllers/message.controller'
// import { sendMessageController } from '../../infrastructure/adapters/Input/controllers/conversationControllers/sendMessageController'

const router = Router()

// router.post('/send', sendMessageController)
router.post('/find', findConversationByIdController)

export default router
