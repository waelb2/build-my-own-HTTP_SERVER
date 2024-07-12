"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net = __importStar(require("net"));
const handleGetMethod_1 = __importDefault(require("./app/handleGetMethod"));
const handlePostRequest_1 = __importDefault(require("./app/handlePostRequest"));
const server = net.createServer((socket) => {
    socket.on("data", async (bufferRequest) => {
        const httpRequest = bufferRequest.toString("utf8");
        const headers = httpRequest.split("\r\n");
        const requestLine = headers[0];
        const URLPath = requestLine.split(" ")[1];
        const method = requestLine.split(" ")[0];
        const query = URLPath.split("/")[2];
        let response = "";
        let body = "";
        try {
            if (method.toLowerCase().trim() === "get") {
                // handling GET request
                [response, body] = await (0, handleGetMethod_1.default)(URLPath, query, headers);
            }
            else if (method.toLowerCase().trim() === "post") {
                // handling POST request
                const body = headers[headers.length - 1];
                response = body ? await (0, handlePostRequest_1.default)(URLPath, query, body) : "";
            }
            socket.write(response);
            if (body.length !== 0) {
                socket.write(body);
            }
        }
        catch (error) {
            console.log(error);
        }
        socket.end();
    });
    socket.on("close", () => {
        socket.end();
    });
});
server.listen(4221, "localhost");
