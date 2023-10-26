import mongoose from "mongoose"

const weaponSchema = mongoose.Schema({
    rank: { type: String, required: true },
    name: { type: String, required: true },
    couponNumber: { type: Number, required: true },
    weaponsType: { type: String, required: true },
    weaponId: { type: String, required: true },
    officerOnDuty: { type: String, required: true },
    taken: { type: Boolean, required: true },
    notTaken: { type: Boolean, required: true },
    edit: { type: Boolean},
    date: { type: Date, default: () => Date.now() }
})

const Weapon = mongoose.model("weapon", weaponSchema)

export default Weapon