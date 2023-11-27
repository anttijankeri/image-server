#!/usr/bin/env node

import app from "../app.js";
// import debug from "debug";
import { createServer } from "http";
import { connectToDbs } from "../db.js";

const connect = async () => {
  try {
    await connectToDbs();
  } catch (error) {
    console.log((error as Error).message);
    process.exit();
  }
};

const port = normalizePort("3456");
app.set("port", port);

const server = createServer(app);

const main = async () => {
  connect();

  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
};

main();

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error: { syscall: string; code: unknown }) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  console.log("Listening on " + bind);
}
