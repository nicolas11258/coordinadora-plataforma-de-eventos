export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({status:"error", error: 'Something went wrong' });
};