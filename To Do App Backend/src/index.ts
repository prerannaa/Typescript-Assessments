import express,{Request, Response} from "express";

import config from "./config";
import routes from "./routes";

const app = express();

app.use(routes);

console.log("Server Running")
app.listen(config.serverPort);