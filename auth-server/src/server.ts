/** Start Express server. */
import http from "http";
import app from "./app";

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
const port = app.get("port");
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onError(error: Error | any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port " + address?.port;
  console.log("Listening on " + bind);
}

export default server;
