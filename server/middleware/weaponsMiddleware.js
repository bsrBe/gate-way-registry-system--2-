import Weapon from "../model/weaponSchema.js";

async function getWeapons(req, res, next) {
    let weapon
    try {
        weapon = await Weapon.findById(req.params.id)
        if (weapon == null) {
            return res.status(404).json({ message: "cannot find weapon" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.weapon = weapon
    next()
}

export { getWeapons }