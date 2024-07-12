import * as net from "net";
import handleGetMethod from "./app/handleGetMethod";
import handlePostRequest from "./app/handlePostRequest";
const server = net.createServer((socket) => {
  socket.on("data", async (bufferRequest) => {
    const httpRequest = bufferRequest.toString("utf8");
    const headers = httpRequest.split("\r\n");
    const requestLine = headers[0];
    const URLPath: string = requestLine.split(" ")[1];
    const method: string = requestLine.split(" ")[0];
    const query: string = URLPath.split("/")[2];

    let response: string = "";
    let body: Buffer | string = "";
    try {
      if (method.toLowerCase().trim() === "get") {
        // handling GET request
        [response, body] = await handleGetMethod(URLPath, query, headers);
      } else if (method.toLowerCase().trim() === "post") {
        // handling POST request

        const body: string = headers[headers.length - 1];

        response = body ? await handlePostRequest(URLPath, query, body) : "";
      }

      socket.write(response);

      if (body.length !== 0) {
        socket.write(body);
      }
    } catch (error) {
      console.log(error);
    }

    socket.end();
  });
  socket.on("close", () => {
    socket.end();
  });
});
server.listen(4221, "localhost");
