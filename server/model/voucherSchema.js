import mongoose from 'mongoose'

const voucherSchema = mongoose.Schema({
    voucher: { type: Number, default: Math.ceil(Math.random() * 900000000000) }
}, {
    timestamps: true
})


const Voucher = mongoose.model('voucher', voucherSchema)

export default Voucher