import mongoose from "mongoose"

const visitorsSchema = mongoose.Schema({
   idNumber: { type: String, required: true},
   name: { type: String, required: true },
   city: { type: String, required: true },
   subCity: { type: String, required: true },
   district: { type: Number, required: true },
   phoneNumber: { type: Number, required: true},
   destinationOffice: { type: String, required: true },
   officerOnDuty: { type: String, required: true },
   date: { type: Date, default: () => Date.now() },
   edit: { type: Boolean, default: false }
})


const Visitor = mongoose.model("visitors", visitorsSchema)

export default Visitor