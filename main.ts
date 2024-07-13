import * as net from "net";
import handleGetMethod from "./app/handleGetMethod";
import handlePostRequest from "./app/handlePostRequest";
import { HTTP_STATUS_SERVER_ERROR } from "./app/globalVars";
import { endString } from "./app/globalVars";

const server = net.createServer((socket) => {
  socket.on("data", async (bufferRequest) => {
    const httpRequest = bufferRequest.toString("utf8");
    const headers: string[] = httpRequest.split("\r\n");
    const requestLineChunks: string[] = headers[0].split(" ");
    const URLPath: string = requestLineChunks[1];
    const method: string = requestLineChunks[0].toLowerCase().trim();
    const query: string = URLPath.split("/")[2];

    try {
      let response: string = "";
      let body: Buffer | string = "";
      if (method === "get") {
        // handling GET request
        [response, body] = await handleGetMethod(URLPath, query, headers);
      } else if (method === "post") {
        // handling POST request
        const postBody: string = headers[headers.length - 1];
        response = postBody
          ? await handlePostRequest(URLPath, query, body)
          : "";
      }

      socket.write(response);
      if (body.length !== 0) {
        socket.write(body);
      }
    } catch (error) {
      const serverErrorResponse: string = HTTP_STATUS_SERVER_ERROR + endString;
      socket.write(serverErrorResponse);
      console.log(error);
    } finally {
      socket.end();
    }
  });
  socket.on("error", (err) => {
    console.error(err);
    socket.end();
  });
  socket.on("close", () => {
    socket.end();
  });
});
server.listen(4221, "localhost");
