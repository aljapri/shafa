import multer, { StorageEngine } from 'multer';
import path from 'path';
import fs from 'fs';
import { NextFunction, Request, Response } from 'express';

// Ensure the "uploads" folder exists
const uploadDir = path.join(__dirname, '../../public/img/users');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the folder if it doesn't exist
}

// Define storage settings
const storage: StorageEngine = multer.diskStorage({
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
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .jpg, or .png files are allowed'));
  }
};

// Configure multer
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB (optional)
  fileFilter,
});

const setPhotoField = (req: Request, res: Response, next: NextFunction) => {
  console.log(req);
  if (req.file) {
    req.body.photo = req.file.filename; // Assign the file's filename to the photo field
  }
  next();
};

export  {upload,setPhotoField};
