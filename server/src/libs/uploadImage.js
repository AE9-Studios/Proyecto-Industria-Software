import multer from "multer"
import path from "path";
import { v4 as uuid } from "uuid"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/img/products'); // Carpeta donde se guardarán los archivos subidos
    },
    filename: function (req, file, cb) {
        const filename = `${uuid()}-${Date.now()}${path.extname(file.originalname)}`; // Nombre del archivo en función de la marca de tiempo y el nombre original
        cb(null, filename); // Llama a la función de devolución de llamada con el nombre del archivo
        req.filename = filename; // Asigna el nombre del archivo a req.filename si lo necesitas en otras partes de tu aplicación
    },
});


export const uploadImg = multer({ storage: storage });