"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readFile_1 = __importDefault(require("./readFile"));
const globalVars_1 = require("./globalVars");
const getHeader_1 = __importDefault(require("./getHeader"));
const validCompression_1 = __importDefault(require("./validCompression"));
const gzipCompress_1 = __importDefault(require("./gzipCompress"));
exports.default = async (URLPath, query, headers) => {
    let response = "";
    let body = "";
    const [acceptsEncoding, validCompressions] = (0, validCompression_1.default)(headers);
    const validCompressionValue = acceptsEncoding && validCompressions.length != 0;
    const omitBody = acceptsEncoding;
    if (URLPath === "/") {
        // handle root path request
        response = globalVars_1.HTTP_STATUS_OK + globalVars_1.endString;
    }
    else if (URLPath === "/user-agent") {
        // handle GET-User-Agent request
        const userAgent = (0, getHeader_1.default)(headers, "user-agent: ");
        response = globalVars_1.HTTP_STATUS_OK + globalVars_1.CONTENT_TYPE_PLAIN;
        if (validCompressionValue) {
            response += `Content-Encoding: ${validCompressions[0]}\r\n` + globalVars_1.endString;
        }
        else if (!omitBody) {
            response += `Content-Length: ${userAgent.length}\r\n` + globalVars_1.endString;
            body = userAgent;
        }
        else {
            response += globalVars_1.endString;
        }
    }
    else if (URLPath === `/echo/${query}`) {
        // handle echo request
        const [supportsGzip, compressedDataRaw] = (0, gzipCompress_1.default)(validCompressions, query);
        response = globalVars_1.HTTP_STATUS_OK + globalVars_1.CONTENT_TYPE_PLAIN;
        if (validCompressionValue) {
            response += `Content-Encoding: ${validCompressions[0]}\r\n`;
            if (supportsGzip) {
                response +=
                    `Content-Length: ${compressedDataRaw.length}\r\n` + globalVars_1.endString;
                body = compressedDataRaw;
            }
        }
        else if (!omitBody) {
            response += `Content-Length: ${query.length}\r\n` + globalVars_1.endString;
            body = query;
        }
        else {
            response += globalVars_1.endString;
        }
    }
    else if (URLPath === `/files/${query}`) {
        // handle file request
        try {
            const args = process.argv.slice(2);
            const [___, filePath] = args;
            const data = await (0, readFile_1.default)(filePath + "/" + query);
            const dataSize = Buffer.byteLength(data, "utf8");
            response =
                globalVars_1.HTTP_STATUS_OK +
                    globalVars_1.CONTENT_TYPE_APP +
                    `Content-Length: ${dataSize}\r\n` +
                    globalVars_1.endString;
            body = data;
        }
        catch (error) {
            response = globalVars_1.HTTP_STATUS_NOT_FOUND + globalVars_1.endString;
        }
    }
    else {
        response = globalVars_1.HTTP_STATUS_NOT_FOUND + globalVars_1.endString;
    }
    return [response, body];
};
