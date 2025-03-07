import express from 'express';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { getLatestMessageEveryUser, getMessages, sendMessage } from '../controllers/message.controller.js';
const messageRouter = express.Router();

messageRouter.get('/getlatestmessageeveryuser/message', protectedRoute, getLatestMessageEveryUser)
messageRouter.post('/send/:id', protectedRoute, sendMessage)
messageRouter.get('/:id', protectedRoute, getMessages)

export default messageRouter