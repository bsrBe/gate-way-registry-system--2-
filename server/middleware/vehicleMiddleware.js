import Vehicle from "../model/vehicleSchema.js"

async function getVehicles(req, res, next) {
    let vehicle
    try {
        vehicle = await Vehicle.findById(req.params.id)
        if (vehicle == null) {
            return res.status(404).json({ message: "cannot find Vehicles" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.vehicle = vehicle
    next()
}

export { getVehicles }