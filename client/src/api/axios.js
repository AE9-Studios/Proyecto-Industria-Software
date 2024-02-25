import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:3000/api", //fuera del docker
    // baseURL: "http://localhost:8000/api", //dentro del docker,
    withCredentials: true
})

export default instance