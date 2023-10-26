import express from 'express'
const router = express.Router()
import {
    getAllUsers,
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    deleteUser
} from '../controllers/userController.js'
import { getUsers, protect } from '../middleware/authMiddleware.js'

router.post('/', registerUser)
router.delete('/list/:id', getUsers, deleteUser)
router.get('/list', getAllUsers)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)


export default router