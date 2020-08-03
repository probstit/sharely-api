import * as path from "path";
import * as http from "http";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
const helmet = require("helmet");
import * as cors from "cors";

import { ProcessManager } from "./util/process/manager";
import { Logger } from "./util/process/logger";
import { accessLogger } from "./util/http/accessLogger";

import { Sharely } from "./app";
import { config } from "./config";

// var log = require('why-is-node-running');

// wrap HttpServer with gracefull shutdown module
require("http-shutdown").extend();

let pm = new ProcessManager();
let app: express.Express | null = null;
let server: http.Server | null = null;
let sharely: Sharely | null = null;

pm.once("start", async () => {
  try {
    await bootstrap();
  } catch (error) {
    Logger.get().error(error);
    await tearDown();
  }
});
pm.once("stop", () => {
  Logger.get().write("received shutdown signal, closing server ...");

  // server.close();
  (server as any).shutdown();
});
pm.init(path.join(__dirname, "../default.json"));

async function bootstrap() {
  app = express();
  server = http.createServer(app);

  sharely = new Sharely();
  await sharely.start();

  // to be used only with a frontend (nginx or any load balancer)
  // (by default req.ip will ignore the 'x-forwarded-for' header)
  app.enable("trust proxy");

  // redirect http -> https
  app.use((req, res, next) => {
    // check for load balancer forwarded protocol header, not the direct protocol which will always be HTTP
    if (req.headers["x-forwarded-proto"] === "http") {
      let host = req.hostname.replace(/^www\./i, "");
      let href = `https://${host}${req.url}`;
      return res.redirect(href);
    }

    let wwwRx = /^www\./i;
    if (wwwRx.test(req.hostname)) {
      let host = req.hostname.replace(/^www\./i, "");
      let href = `https://${host}${req.url}`;
      return res.redirect(href);
    }

    next();
  });

  // load balancer health check route
  app.get("/health-check", (req, res) => {
    req;
    res.end();
  });

  // configure middleware
  app.use(helmet({}));
  app.use(helmet.referrerPolicy());
  app.use(accessLogger(config.accessLog.format, config.accessLog.file));
  app.use(bodyParser.json());
  app.use(compression());
  app.use(
    cors({
      origin: [/localhost/i, /192.168.88/i],
    })
  );

  // load API gateway
  if (!sharely.apiGateway) {
    throw new Error("API GATEWAY NOT INITIALIZED.");
  }
  app.use(sharely.apiGateway.router);

  // configure static routes
  // app.use(express.static(nconf.get('fileStore:path'), {
  //   immutable: true,
  //   maxAge: 31536000
  // }));
  // app.use(express.static(nconf.get('fileStore:tempPath'), {
  //   immutable: true,
  //   maxAge: 31536000
  // }));

  let host: string = config.host;
  let port: number = config.port;
  server.listen(port, host, () => {
    Logger.get().write("magic happens on port", port);
  });

  // enable gracefull shutdown on server
  (server as any).withShutdown();

  server.once("close", async () => {
    await tearDown();
  });
}

async function tearDown() {
  try {
    if (sharely) await sharely.stop();
    Logger.get().write("server closed gracefully.");

    // log();
  } catch (error) {
    Logger.get().error(error);
  }
}
