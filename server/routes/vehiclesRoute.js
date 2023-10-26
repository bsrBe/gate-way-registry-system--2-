import express from 'express'
const router = express.Router()
import {
    getAllVehicle,
    getOneVehicle,
    createVehicle,
    updatedVehicle,
    deleteVehicle
} from '../controllers/vehicleController.js'
import { getVehicles } from '../middleware/vehicleMiddleware.js'



// Getting All 
router.get('/', getAllVehicle)

// Getting One
router.get('/:id', getVehicles, getOneVehicle)

// Creating One
router.post('/', createVehicle)

// Updating One
router.patch('/:id', getVehicles, updatedVehicle)

// Deleting One
router.delete('/:id', getVehicles, deleteVehicle)


export default router