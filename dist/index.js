"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const axios = require('axios').default;
const jsdom = require("jsdom");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const prisma = new client_1.PrismaClient();
const { JSDOM } = jsdom;
const axiosInstance = axios.create({
    baseURL: 'https://pubmed.ncbi.nlm.nih.gov/',
    timeout: 1000
});
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});
app.get('/article/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    prisma.externalArticles.findMany()
        .then((resp) => res.send(resp))
        .catch((err) => res.send([]));
}));
app.get('/', (req, res) => {
    res.send('Express server is running!');
});
app.get('/:externalArticleId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { externalArticleId } = req.params;
    axiosInstance.get(externalArticleId)
        .then(({ data }) => {
        console.debug(data);
        if (data) {
            const parser = new JSDOM(data);
            res.send(parser.window.document.querySelector('#enc-abstract').innerHTML);
        }
        else {
            res.send(null);
        }
    })
        .catch((err) => {
        // Log the error and send back an empty array
        console.error(err);
        res.send(null);
    });
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
