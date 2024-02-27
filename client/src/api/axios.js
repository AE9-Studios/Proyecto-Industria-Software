import axios from 'axios'

const instance = axios.create({
    // baseURL: "http://localhost:3000/api", //fuera del docker en local
    // baseURL: "http://localhost:8000/api", //dentro del docker,
    // baseURL: "http://dominio/api", //para produccion,
    baseURL: "https://hp8h5d2f-3000.use2.devtunnels.ms/api", //poner el url de vscode para ver en otro lugar (añadir puerto en la terminal),
    // withCredentials: true //no activar porque 
})

export default instance