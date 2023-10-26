import express from 'express'
const router = express.Router()
import {
    getAllWeapons,
    getNotTakenWeapons,
    getOneWeapon,
    createWeapons,
    updatedWeapon,
    deleteWeapons
} from '../controllers/weaponController.js'
import { getWeapons } from '../middleware/weaponsMiddleware.js'

// Getting All 
router.get('/', getAllWeapons)

// Getting taken Weapons Only
router.get('/weaponcontroller', getNotTakenWeapons)

// Getting One
router.get('/:id', getWeapons, getOneWeapon)

// Creating One
router.post('/', createWeapons)

// Updating One
router.patch('/:id', getWeapons, updatedWeapon)

// Deleting One
router.delete('/:id', getWeapons, deleteWeapons)

export default router