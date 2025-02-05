require('dotenv').config({ path: `${process.env.NODE_ENV !== "development" ? "./src/.env" : "./src/.env.development"}` });

import express from "express";
import swaggerUi from 'swagger-ui-express';
import yaml from "yaml";
import router from "./routes"
import config from "./auth/config";

import { readFileSync } from "fs";
import { auth } from "express-oauth2-jwt-bearer";
import { auth_development_bypass } from "./middlewares";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/apiv1", swaggerUi.serve, swaggerUi.setup(yaml.parse(readFileSync('./src/swagger/output/bundled.yaml', 'utf8'))))
app.use("/apiv1", auth_development_bypass, auth(config), router);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/apiv1`);
});
