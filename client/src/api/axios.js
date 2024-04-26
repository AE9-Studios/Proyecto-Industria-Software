import axios from 'axios'

const instance = axios.create({
<<<<<<< HEAD
    // baseURL: "http://localhost:3000/api", //fuera del docker en local
    // baseURL: "http://localhost:8000/api", //dentro del docker, 
    baseURL: "https://classic-vision.alhanisespinal.tech/api", //para produccion,
=======
    baseURL: "http://localhost:3000/api", //fuera del docker en local
    // baseURL: "http://192.168.0.10:3000/api", //dentro del docker,
    // baseURL: "http://dominio/api", //para produccion,
>>>>>>> dev
    // baseURL: "https://hp8h5d2f-80.use2.devtunnels.ms/api", //poner el url de vscode para ver en otro lugar (añadir puerto en la terminal),
})

export default instance