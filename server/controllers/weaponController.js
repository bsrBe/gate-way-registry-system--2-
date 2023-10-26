import asyncHandler from "express-async-handler";
import Weapon from "../model/weaponSchema.js";


// @desc Get all the weapons data
// /route  GET /api/weapons
// @access Public 
const getAllWeapons = asyncHandler(async (req, res) => {
    try {
        const weapons = await Weapon.find({}).limit(2500).sort({ date: -1 })
        res.json(weapons)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// @desc Get all the weapons data
// /route  GET /api/weapons
// @access Public
const getNotTakenWeapons = asyncHandler(async (req, res) => {
    try {
        const weapons = await Weapon.find({ notTaken: true }).sort({ date: -1 })
        res.json(weapons)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// @desc Get one of the weapons data
// /route  GET /api/weapons
// @access Public 
const getOneWeapon = (req, res) => {
    res.send(res.weapon)
}

// @desc post the weapons data
// /route  POST /api/weapons
// @access Public

const createWeapons = asyncHandler(async (req, res) => {

    const { rank, name, couponNumber, weaponsType, weaponId, officerOnDuty, taken, notTaken, edit } = req.body

    const weapon = await Weapon.create({
        rank,
        name,
        couponNumber,
        weaponsType,
        weaponId,
        officerOnDuty,
        taken,
        notTaken,
        edit
    })

    if (weapon) {
        console.log(weapon)
        res.status(201).json(weapon)
    } else {
        res.status(400)
        throw Error("Invalid weapons Data")
    }
})

// @desc update the weapons data
// /route  PATCH /api/weapons
// @access Public 
const updatedWeapon = async (req, res) => {
    if (req.body.name != null) {
        res.weapon.name = req.body.name
    }
    if (req.body.rank != null) {
        res.weapon.rank = req.body.rank
    }
    if (req.body.couponNumber != null) {
        res.weapon.couponNumber = req.body.couponNumber
    }
    if (req.body.weaponId != null) {
        res.weapon.weaponId = req.body.weaponId
    }
    if (req.body.weaponsType != null) {
        res.weapon.weaponsType = req.body.weaponsType
    }
    if (req.body.taken != null) {
        res.weapon.taken = req.body.taken
    }
    if (req.body.notTaken != null) {
        res.weapon.notTaken = req.body.notTaken
    }

    try {
        const updatedWeapon = await res.weapon.save()
        res.json(updatedWeapon)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

// @desc Delete the weapons data
// /route  GET /api/weapons
// @access Public 
const deleteWeapons = async (req, res) => {
    try {
        await Weapon.findByIdAndDelete(req.params.id);
        res.json({ message: `Deleted weapon ${req.params.id}` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export {
    getAllWeapons, getNotTakenWeapons, getOneWeapon, createWeapons, updatedWeapon, deleteWeapons
}