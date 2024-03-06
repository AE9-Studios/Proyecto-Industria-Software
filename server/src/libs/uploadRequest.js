import multer from "multer"
import path from "path"
import { v4 as uuid } from "uuid"
import fs from 'fs'
const storageDocument = multer.diskStorage({


  destination: function (req, file, cb) {
    const allowedPDFExtensions = ['.pdf', '.png', '.jpg'];

    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedPDFExtensions.includes(fileExtension)) {
      return cb('El archivo tener una de las siguientes extensiones' + allowedPDFExtensions.join(', '), null);
    }

    cb(null, 'src/assets/requests');
  },
  filename: function (req, file, cb) {


    const filename = req.fileName || uuid() + '-' + Date.now() + path.extname(file.originalname);
    cb(null, filename);
    req.body.fileName = filename

  },
});

export const deleteDocument = (file) => {
  const fileDelete = `src/assets/requests/${file}`;
  console.log(fileDelete)

  if (fs.existsSync(fileDelete)) {
    fs.unlink(fileDelete, (err) => {
      if (err) {
        console.error('Error al eliminar el archivo:', err);
      }
    });
  }
}

export const uploadRequest = multer({ storage: storageDocument });