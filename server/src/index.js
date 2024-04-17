import 'dotenv/config'
import app from "./app.js";


// sin https
app.listen(process.env.BACKEND_PORT);


console.log(`Server listening on https://localhost:${process.env.BACKEND_PORT}`);