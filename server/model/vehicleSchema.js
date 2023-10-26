import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema({
    licensePlateNumber: { type: String, required: true },
    RegionalCode: { type: String, required: true },
    vehicleOwner: { type: String, required: true },
    idnumber: { type: String, required: true },
    vehicleType: { type: String, required: true },
    destinationOffice: { type: String, required: true },
    officerOnDuty: { type: String, required: true },
    date: { type: Date, default: () => Date.now() }
})

const Vehicle = mongoose.model("vehicle", vehicleSchema)

export default Vehicle