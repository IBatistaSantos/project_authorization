import createConnection from "@/infra/database/typeorm/connection";
import express from "express";

import setupRoutes from "./routes";

const app = express();

createConnection().then(async () => {
  setupRoutes(app);
});

app.use(express.json());
export { app };
