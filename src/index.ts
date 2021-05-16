import express, { Application } from 'express';
import { json } from "body-parser";
import { routes } from "./routes"
import setupMongo from "./config/mongo"

setupMongo()

const app: Application = express();
app.use(json())
routes(app)

const port = 7000;

// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));