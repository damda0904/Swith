import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRouter from './router/userRouter.js'
import groupRouter from './router/groupRouter.js'
import certifyRouter from './router/certifyRouter.js'
import todoRouter from './router/todoRouter.js'
import { config } from './config.js';
import { connectDB } from './db/database.js';

const app = express();
const router = express.Router();

app.use(express.json())
app.use(cors());
app.use(helmet());

// app.use('/test', router.get('/', (req, res) => {
//     console.log("test")
//     res.status(200).json({ message: "connection is okay! :D" })
// }));

app.use('/user', authRouter);
app.use('/group', groupRouter);
app.use('/certify', certifyRouter);
app.use('/todo', todoRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
})

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
})

connectDB().then(() => {
    const server = app.listen(config.host.port);
    console.log("listening")
})
