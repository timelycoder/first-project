// const express = require("express");
import cors from 'cors';
import express, { Request, Response } from 'express';
const app = express();

///parser

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});
console.log(process.cwd());
///C:\Users\ADMIN\projects\first-project-new/.env

export default app;
