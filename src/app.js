import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routers';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);


// app.use(fileUpload());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true , limit: '50mb'}))


const port = process.env.PORT || 6789;

app.listen(port, () => {
  console.log(port);
});

export default app;