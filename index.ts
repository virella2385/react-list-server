import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
const axios = require('axios').default;
const jsdom = require("jsdom");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const prisma = new PrismaClient();
const { JSDOM } = jsdom;

const axiosInstance = axios.create({
  baseURL: 'https://pubmed.ncbi.nlm.nih.gov/',
  timeout: 1000
});

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/article/list', async (req: Request, res: Response) => {	
	prisma.externalArticles.findMany()
		.then((resp) => res.send(resp))
		.catch((err) => res.send([]));
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express server is running!');
});

app.get('/:externalArticleId', async (req: Request, res: Response) => {
	const { externalArticleId } = req.params;

	axiosInstance.get(externalArticleId)
		.then(({ data }: any ) => {
			console.debug(data);
			if (data) {
				const parser = new JSDOM(data);
				res.send(parser.window.document.querySelector('#enc-abstract').innerHTML);
			} else {
				res.send(null);
			}
		})
		.catch((err: any) => {
			// Log the error and send back an empty array
			console.error(err);
			res.send(null);
		});
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});