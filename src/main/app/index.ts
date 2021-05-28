import "reflect-metadata";

import createConnection from "@/infra/database/typeorm/connection";
import express from "express";

const app = express();

createConnection().then(async () => {
  const routes = (await import("./routes")).default;

  app.use("/api", routes);
});

app.use(express.json());

export { app };
