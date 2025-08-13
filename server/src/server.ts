import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes/route.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.get('/', (req: Request, res: Response) => {
    res.send({message: "Welcome to InnoQuest"});
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})