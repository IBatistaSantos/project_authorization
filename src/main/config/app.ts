import createConnection from "@/infra/database/typeorm/connection";
import express from "express";

const app = express();

createConnection().then(async () => {
  const routes = (await import("../app/routes")).default;
  app.use(routes);
});

app.use(express.json());
export { app };
