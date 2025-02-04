require('dotenv').config({ path: './src/.env' });

import express, { Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import yaml from "yaml";
import router from "./routes"
import config from "./auth/config";

import { readFileSync } from "fs";
import { auth } from "express-oauth2-jwt-bearer";

const app = express();
const port = 3000;

app.use(express.json());
app.use(auth(config));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(yaml.parse(readFileSync('./src/swagger/output/bundled.yaml', 'utf8'))))
app.use('/apiv1', router);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
