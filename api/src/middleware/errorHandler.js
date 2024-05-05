export const errorHandler = (error, req, res, next) => {
    const status = error.status || 500; 
    res.status(status).json({ error: error.message });
};