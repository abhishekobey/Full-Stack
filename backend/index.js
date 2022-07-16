import express from 'express';
const app = express();
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from "body-parser";
import contactRouters from "./routes/contactRouters.js";
dotenv.config();

//connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser: true}
);
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log("CONNECTED"))

app.use(bodyParser.json())

app.use('/contacts', contactRouters)

app.listen(8000, () => {
    console.log('Server running to port 8000');
});