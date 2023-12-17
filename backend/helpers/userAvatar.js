const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatar');
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}_${file.originalname}`;
        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileExtensions = ['.jpg', '.png', '.jpeg'];
    const ext = path.extname(file.originalname).toLowerCase();
    const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes

    if (!allowedFileExtensions.includes(ext) || file.size > maxFileSize) {
        const errorMessage = [];
        if (!allowedFileExtensions.includes(ext)) {
            errorMessage.push('Invalid file type. Only JPG and PNG are allowed.');
        }
        if (file.size > maxFileSize) {
            errorMessage.push('File size exceeds the limit (2MB).');
        }
        return cb(null, false, { message: errorMessage.join(' ') });
    }

    cb(null, true);
};

const saveImageMiddleware = (req, res, next) => {
    // Check if there is an image file to upload
    if (req.file) {
        // Create a new multer instance for this specific request
        const upload = multer({
            storage,
            fileFilter,
            limits: {
                fileSize: 2 * 1024 * 1024, // 2MB limit
            },
        }).single('image'); // Adjust 'image' based on your form field name

        // Call the multer middleware with the request, response, and next
        upload(req, res, next);
    } else {
        // If no image, move on to the next middleware or route handler
        next();
    }
};

module.exports = saveImageMiddleware;
