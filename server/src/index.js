import 'dotenv/config'
import app from "./app.js";
import https from 'https';
import fs from 'fs';


//sin ssl
app.listen(process.env.BACKEND_PORT)


//con ssl
// https.createServer({
//     cert: fs.readFileSync('server.crt'),
//     key: fs.readFileSync('server.key')
// }, app).listen(process.env.BACKEND_PORT);


console.log(`Server listening on http://localhost:${process.env.BACKEND_PORT}`);