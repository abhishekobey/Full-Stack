import express from 'express';
const app = express();
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from "body-parser";
import contactRouters from "./routes/contactRouters.js";
import path from "path";
import morgan from "morgan";
dotenv.config();

//connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser: true}
);
if(process.env.NODE_ENV === 'developement') {
    app.use(morgan('dev'))
}

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log("CONNECTED"))

app.use(bodyParser.json())

app.use('/contacts', contactRouters)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server running to port ${PORT}`);
});