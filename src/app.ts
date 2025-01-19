import express, { Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import yaml from "yaml";
import router from "./routes"
import { readFileSync } from "fs";

const app = express();
const port = 3000;

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(yaml.parse(readFileSync('./src/swagger/output/bundled.yaml', 'utf8'))))
app.use('/apiv1', router);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
