import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";
import fs from 'fs';

const storageDocument = multer.diskStorage({
  destination: function (req, file, cb) {
    const allowedPDFExtensions = ['.pdf', '.png', '.jpg'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedPDFExtensions.includes(fileExtension)) {
      return cb('El archivo debe tener una de las siguientes extensiones: ' + allowedPDFExtensions.join(', '), null);
    }
    cb(null, 'src/assets/requests');
  },
  filename: function (req, file, cb) {
    const filename = uuid() + '-' + Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

export const deleteDocument = (file) => {
  const fileDelete = `src/assets/requests/${file}`;
  console.log(fileDelete);

  if (fs.existsSync(fileDelete)) {
    fs.unlink(fileDelete, (err) => {
      if (err) {
        console.error('Error al eliminar el archivo:', err);
      }
    });
  }
};

const storageInvoice = multer.diskStorage({
  destination: function (req, file, cb) {
    const allowedPDFExtensions = ['.pdf'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedPDFExtensions.includes(fileExtension)) {
      return cb('El archivo debe tener una de las siguientes extensiones: ' + allowedPDFExtensions.join(', '), null);
    }
    cb(null, 'src/assets/invoices');
  },
  filename: function (req, file, cb) {
    const filename = uuid() + '-' + Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

export const deleteInvoice = (file) => {
  const fileDelete = `src/assets/invoices/${file}`;
  console.log(fileDelete);

  if (fs.existsSync(fileDelete)) {
    fs.unlink(fileDelete, (err) => {
      if (err) {
        console.error('Error al eliminar el archivo:', err);
      }
    });
  }
};

const storageOrder = multer.diskStorage({
  destination: function (req, file, cb) {
    const allowedPDFExtensions = ['.pdf'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedPDFExtensions.includes(fileExtension)) {
      return cb('El archivo debe tener una de las siguientes extensiones: ' + allowedPDFExtensions.join(', '), null);
    }
    cb(null, 'src/assets/orders');
  },
  filename: function (req, file, cb) {
    const filename = uuid() + '-' + Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

export const deleteOrder = (file) => {
  const fileDelete = `src/assets/orders/${file}`;
  console.log(fileDelete);

  if (fs.existsSync(fileDelete)) {
    fs.unlink(fileDelete, (err) => {
      if (err) {
        console.error('Error al eliminar el archivo:', err);
      }
    });
  }
};


export const uploadRequest = multer({ storage: storageDocument });
export const uploadInvoice = multer({ storage: storageInvoice });
export const uploadOrder = multer({ storage: storageOrder });