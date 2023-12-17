const saveImage = (req, res, next) => {
    if (!req.file) {
        // No file uploaded, handle it as needed (e.g., send an error response)
        return res.status(400).json({ error: 'No image file uploaded.' });
    }

    // File exists, continue with the next middleware or route handler
    next();
};

module.exports = saveImage;