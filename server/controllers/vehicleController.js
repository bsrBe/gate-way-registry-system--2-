import asyncHandler from "express-async-handler";
import Vehicle from "../model/vehicleSchema.js";


// @ desc get all from vehicle schema
// route  GET /api/vehicle
// @access Public 
const getAllVehicle = asyncHandler(async (req, res) => {
    try {
        const visitors = await Vehicle.find({}).limit(2500).sort({ date: -1 })
        res.json(visitors)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// @ desc get only One 
// route  POST /api/vehicel
// @access Public 
const getOneVehicle = (req, res) => {
    res.send(res.vehicle)
}


// @desc post the vehicle data
// /route  POST /api/vehicle
// @access Public 
const createVehicle = asyncHandler(async (req, res) => {

    const { licensePlateNumber,RegionalCode, vehicleOwner, idnumber, vehicleType, destinationOffice, officerOnDuty, date } = req.body

    const vehicle = await Vehicle.create({
        licensePlateNumber,
        RegionalCode,
        vehicleOwner,
        idnumber,
        vehicleType,
        destinationOffice,
        officerOnDuty,
        date
    })

    if (vehicle) {
        console.log(vehicle)
        res.status(201).json(vehicle)
    } else {
        res.status(400)
        throw Error('invalid vehicle Data')
    }

})


// @desc UPDATE the vehicle data
// /route  PATCH /api/vehicle
// @access Public 
const updatedVehicle = async (req, res) => {
    if (req.body.vehicleOwner != null) {
        res.vehicle.vehicleOwner = req.body.vehicleOwner
    }
    if (req.body.licensePlateNumber != null) {
        res.vehicle.licensePlateNumber = req.body.licensePlateNumber
    }
    if (req.body.RegionalCode != null) {
        res.vehicle.RegionalCode = req.body.RegionalCode
    }
    if (req.body.idnumber != null) {
        res.vehicle.idnumber = req.body.idnumber
    }
    if (req.body.vehicleType != null) {
        res.vehicle.vehicleType = req.body.vehicleType
    }
    if (req.body.destinationOffice != null) {
        res.vehicle.destinationOffice = req.body.destinationOffice
    }
    try {
        const updatedVehicle = await res.vehicle.save()
        res.json(updatedVehicle)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


// @desc delete the vehicle data
// /route DELETE /api/vehicle
// @access Public 
const deleteVehicle = async (req, res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id);
        res.json({ message: `Deleted Vehicle ${req.params.id}` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



export {
    getAllVehicle, getOneVehicle, createVehicle, updatedVehicle, deleteVehicle
}