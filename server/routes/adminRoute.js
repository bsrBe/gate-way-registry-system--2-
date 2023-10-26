import express from "express";
const router = express.Router()
import {
    authAdmin,
    registerAdmin,
    logoutAdmin,
    getAdminProfile,
    updateAdminProfile
} from '../controllers/adminController.js'
import { adminProtect } from "../middleware/adminAuthMiddleware.js";

router.post('/', registerAdmin)
router.post('/auth', authAdmin)
router.post('/logout', logoutAdmin)
router.route('/profile').get(adminProtect, getAdminProfile).put(adminProtect, updateAdminProfile)



export default router