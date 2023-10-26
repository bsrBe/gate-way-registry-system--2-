import asyncHandler from 'express-async-handler'
import generateAdminToken from '../utils/generateAdminToken.js'
import Admin from '../model/adminSchema.js'

// @desc Auth or login admin/set Token
// /route  POST /api/admin/auth
// @access Public 
const authAdmin = asyncHandler(async (req, res) => {
    const { idNumber, password } = req.body

    const admin = await Admin.findOne({ idNumber })

    if (admin && (await admin.matchPassword(password))) {
        generateAdminToken(res, admin._id)
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            idNumber: admin.idNumber
        })
    } else {
        res.status(401)
        throw Error('Invalid ID number or password')
    }

})

// @desc  Register new admin
// route  POST /api/admin
// @access Public 
const registerAdmin = asyncHandler(async (req, res) => {
    const { name, idNumber, password } = req.body
    const adminExists = await Admin.findOne({ idNumber })

    if (adminExists) {
        res.status(400)
        throw new Error("Admin already exists")
    }

    const admin = await Admin.create({
        name,
        idNumber,
        password
    })

    if (admin) {
        generateAdminToken(res, admin._id)
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            idNumber: admin.idNumber
        })
    } else {
        res.status(400)
        throw Error('invalid user data')
    }
})

// @desc Logout admin
// route  POST /api/admin/logout
// @access Public 
const logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: "Admin Logout out" })
})

// @desc   Get Admin profile
// /route  GET /api/admin/profile
// @access Private
const getAdminProfile = asyncHandler(async (req, res) => {

    const admin = {
        _id: req.admin._id,
        name: req.admin.name,
        idNumber: req.admin.idNumber,
    }
    
    res.status(200).json(admin)
})



// @desc  Update 
// /route  POST /api/admin/profile
// @access Private
const updateAdminProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id)

    if (admin) {
        admin.name = req.body.name || admin.name
        admin.idNumber = req.body.idNumber || admin.idNumber

        if (req.body.password) {
            admin.password = req.body.password
        }

        const updatedAdmin = await admin.save()
        res.status(201).json(updatedAdmin)
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

export {
    authAdmin, registerAdmin, logoutAdmin, getAdminProfile, updateAdminProfile
}