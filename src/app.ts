import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import routes from './routers/routes';
import {db} from './config/db';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

db.sync();

app.use(routes);
app.listen(process.env.PORT || 3333, ()=> console.log('Server starded'));