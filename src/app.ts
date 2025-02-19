import cors from 'cors';
import express, { Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
const app = express();

///parser

app.use(express.json());
app.use(cors());

//application routes

app.use('/api/v1/students', StudentRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);
// console.log(process.cwd());
///C:\Users\ADMIN\projects\first-project-new/.env

export default app;
