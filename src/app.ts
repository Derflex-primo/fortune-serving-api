import express, { Request, Response } from "express";
import swaggerUi from 'swagger-ui-express';
import yaml from "yaml";

import { readFileSync } from "fs";


const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(yaml.parse(readFileSync('./src/swagger/output/bundled.yaml', 'utf8'))))

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript Express!");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
