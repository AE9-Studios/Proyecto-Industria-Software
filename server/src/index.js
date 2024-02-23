import 'dotenv/config'
import app from "./app.js";



app.listen(process.env.BACKEND_PORT)
console.log(`Server listening on http://localhost:${process.env.BACKEND_PORT}`)