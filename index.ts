import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import articles from './routes/articles';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/article', articles);

app.get('/', (req: Request, res: Response) => {
  res.send('Express server is running!');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});