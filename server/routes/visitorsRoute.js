import express from 'express'
import { getVisitors } from '../middleware/visitorsMiddleware.js'
const router = express.Router()
import {
    getAllVisitors,
    getOneVisitor,
    createVisitors,
    updatedVisitor,
    deleteVisitor,
} from '../controllers/visitorController.js'

// Getting All 
router.get('/', getAllVisitors)

// Getting One
router.get('/:id', getVisitors, getOneVisitor)

// Creating One
router.post('/', createVisitors)

// Updating One
router.patch('/:id', getVisitors, updatedVisitor)

// Deleting One
router.delete('/:id', getVisitors, deleteVisitor)



export default router