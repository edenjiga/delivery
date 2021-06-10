import "dotenv/config";
import cors from "cors";

import express from "express";
import router from "./routes";

const app = express();

app.use(cors({}));

app.use(router);

app.use((error: Error, req: Express.Request, res: any, next: any) => {
  console.log(error.message);
  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  });
});

export default app;
