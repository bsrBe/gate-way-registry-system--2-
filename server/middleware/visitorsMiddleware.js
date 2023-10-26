import Visitor from "../model/visitorSchema.js"

async function getVisitors(req, res, next) {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: 'Cannot find visitors' });
        }
        
        res.visitor = visitor;
        next();
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { getVisitors }


