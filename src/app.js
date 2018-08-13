import http from "http";
import { env, mongo, port, ip, apiRoot } from "./config";
import mongoose from "./services/mongoose";
import express from "./services/express";
import schedulePing from "./services/ellucian";
import api from "./api";

const app = express(apiRoot, api);
const server = http.createServer(app);

mongoose.connect(mongo.uri);
mongoose.Promise = Promise;

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log(
      "Express server listening on http://%s:%d, in %s mode",
      ip,
      port,
      env
    );
  });
  schedulePing(`http://${ip}:${port}/subscriptions/process`, 5000);
  schedulePing(`http://${ip}:${port}/courses/process`, 30000);
});

export default app;
