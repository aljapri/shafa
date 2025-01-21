"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPhotoField = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Ensure the "uploads" folder exists
const uploadDir = path_1.default.join(__dirname, '../../public/img/users');
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true }); // Create the folder if it doesn't exist
}
// Define storage settings
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save files to the "uploads" folder
    },
    filename: (req, file, cb) => {
        console.log(req);
        console.log(file);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Only .jpeg, .jpg, or .png files are allowed'));
    }
};
// Configure multer
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB (optional)
    fileFilter,
});
exports.upload = upload;
const setPhotoField = (req, res, next) => {
    console.log(req);
    if (req.file) {
        req.body.photo = req.file.filename; // Assign the file's filename to the photo field
    }
    next();
};
exports.setPhotoField = setPhotoField;
