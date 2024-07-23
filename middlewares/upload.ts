import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) => {
  const filetypes = /video\/|application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only videos and Excel files are allowed!'));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;