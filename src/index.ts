import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";
import router from "./routes/Routes";

const app = express();
const port = configDotenv().parsed?.APP_PORT;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Node.JS API is running" });
});

app.listen(port, () => {
  console.log(`${configDotenv().parsed?.APP_NAME} is running on port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

module.exports = app;   
