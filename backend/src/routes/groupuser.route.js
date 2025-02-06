import express from 'express'
import { protectedRoute } from '../middleware/auth.middleware.js'
import { createGroup, getAllgroups, getGroups } from '../controllers/groupuser.controller.js'
const groupUserRouter = express.Router()

groupUserRouter.post('/creategroup', protectedRoute, createGroup)
groupUserRouter.get('/getallgroups', protectedRoute, getAllgroups)
groupUserRouter.get('/getgroups/:id', protectedRoute, getGroups)

export default groupUserRouter