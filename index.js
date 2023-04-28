import express from 'express'
import connection from './database/db.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/routes.js';
const PORT = process.env.PORT || 5000;

const URL = process.env.MONGODB_URI||'mongodb+srv://hannan:farhan@cluster0.d7qcp.mongodb.net/eroxer?retryWrites=true&w=majority';
const app = express();
//if this values is production then run this and on horuku its value is always production then it will run
//client which run through build, to run the front-end we have to create production build 
//and give it adress here.


app.use(bodyParser.json({ extended: true,limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.listen(PORT, () => console.log('server is running'));
app.use('/', router)
connection(URL);