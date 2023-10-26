import express from 'express';
import Voucher from '../model/voucherSchema.js';
const router = express.Router();

// Generate or regenerate the voucher for the authenticated user
router.get('/', async (req, res) => {
    try {
        const voucher = await Voucher.find()
        res.status(201).json(voucher)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

});

router.get('/:id', getVoucher, async (req, res) => {
    res.send(res.voucher)
})

router.post('/generate', async (req, res) => {

    const voucher = await Voucher.create({
        voucher: req.body.voucher
    })

    try {
        if (!voucher) {
            res.status(200).json(voucher)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.patch('/regenerate/:id', getVoucher, async (req, res) => {

    if (req.body.voucher != null) {
        res.voucher.voucher = req.body.voucher
    }

    try {
        const updatedVoucher = await res.voucher.save()
        res.json(updatedVoucher)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/delete/:id', getVoucher, async (req, res) => {
    try {
        await Voucher.findByIdAndDelete(req.params.id)
        res.json({ message: "Deleted Voucher" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getVoucher(req, res, next) {
    try {
        const voucher = await Voucher.findById(req.params.id);
        if (!voucher) {
            return res.status(404).json({ message: 'Cannot find voucher' });
        }

        res.voucher = voucher;
        next();

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default router;