// src/middlewares/upload.middleware.ts
import multer from 'multer';
import path from 'path';

// Define storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the directory for storing files
    cb(null, path.resolve(__dirname, '../../public/uploads')); // Path outside the `src` directory
  },
  filename: (req, file, cb) => {
    // Define the filename with a timestamp to avoid conflicts
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create multer instance with storage settings
const upload = multer({ storage });

export default upload;
