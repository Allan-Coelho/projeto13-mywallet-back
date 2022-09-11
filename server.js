import express from 'express';
import dotenv from "dotenv";
import authenticationRouter from './routers/authentication.js';
import transactionsRouter from './routers/transactions.js';

const server = express();

dotenv.config();

server.use(express.json()).use(authenticationRouter).use(transactionsRouter);
server.listen(process.env.PORT);