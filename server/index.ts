import express, { Request, Response } from "express";

import DB from "./config/data-source";
import { router } from "./routers/routes";
import cors from "cors";

const PORT = 8081;

class Server {
  private _app = express();

  private _databaseConnection = DB;

  get app() {
    return this._app;
  }

  get databaseConnection() {
    return this._databaseConnection;
  }
}

const server = new Server();

server.databaseConnection();
server.app.use(express.json());
server.app.use(
  cors({
    origin: ["http://localhost:5173/"],
  })
);

server.app.get("/test", (req: Request, res: Response) => {
  res.json({
    data: "Test Done 2",
  });
});

server.app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

server.app.use("/api", router);
