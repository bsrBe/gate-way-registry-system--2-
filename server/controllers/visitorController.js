import asyncHandler from "express-async-handler";
import Visitor from '../model/visitorSchema.js'


// @desc GEt  or get all from visitor schema
// route  GET /api/visitors
// @access Public 
const getAllVisitors = asyncHandler(async (req, res) => {
    try {
        const visitors = await Visitor.find({}).limit(2500).sort({ date: -1 })
        res.json(visitors)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// @desc GET only One 
// /route  POST /api/visitors
// @access Public 
const getOneVisitor = (req, res) => {
    res.send(res.visitor)
}


// @desc post the visitor data
// /route  POST /api/visitors
// @access Public 
const createVisitors = asyncHandler(async (req, res) => {

    const { idNumber, name, city, subCity, district, phoneNumber, destinationOffice, officerOnDuty } = req.body

    const visitors = await Visitor.create({
        idNumber,
        name,
        city,
        subCity,
        district,
        phoneNumber,
        destinationOffice,
        officerOnDuty
    })

    if (visitors) {
        console.log(visitors)
        res.status(201).json(visitors)
    } else {
        res.status(400)
        throw Error('invalid visitor Data')
    }

})


// @desc UPDATE the visitor data
// /route  PATCH /api/visitors
// @access Public 
const updatedVisitor = async (req, res) => {
    
    if (req.body.name != null) {
        res.visitor.name = req.body.name
    }
    if (req.body.idNumber != null) {
        res.visitor.idNumber = req.body.idNumber
    }
    if (req.body.city != null) {
        res.visitor.city = req.body.city
    }
    if (req.body.subCity != null) {
        res.visitor.subCity = req.body.subCity
    }
    if (req.body.district != null) {
        res.visitor.district = req.body.district
    } 
    if (req.body.phoneNumber != null) {
        res.visitor.phoneNumber = req.body.phoneNumber
    }
    if (req.body.destinationOffice != null) {
        res.visitor.destinationOffice = req.body.destinationOffice
    }
    
    try {
        const updatedVisitor = await res.visitor.save()
        res.json(updatedVisitor)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


// @desc delete the visitor data
// /route DELETE /api/visitors
// @access Public 
const deleteVisitor = async (req, res) => {
    try {
        await Visitor.findByIdAndDelete(req.params.id);
        res.json({ message: `Deleted visitor` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export {
    getAllVisitors, getOneVisitor, createVisitors, updatedVisitor, deleteVisitor
}