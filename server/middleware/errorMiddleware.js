const notFound = (req, res, next) => {
    const error = new Error(`not found -${req.originalUrl}`)
    req.status(404)
    next(error)
}
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message
    if (err.name === 'CastError' && err.kind === 'objectId') {
        statusCode = 404
        message = 'resource not Found'
    }
    res.status(statusCode).json({
        message,
        stcak: process.env.NODE_ENV === 'production' ? null : err.stcak
    })
}

export {
    notFound, errorHandler
}