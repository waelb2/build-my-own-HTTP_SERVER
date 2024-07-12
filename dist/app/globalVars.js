"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endString = exports.COMPRESSION_SCHEMES = exports.CONTENT_TYPE_APP = exports.CONTENT_TYPE_PLAIN = exports.HTTP_STATUS_NOT_FOUND = exports.HTTP_STATUS_OK = exports.HTTP_STATUS_CREATED = void 0;
exports.HTTP_STATUS_CREATED = `HTTP/1.1 201 Created\r\n`;
exports.HTTP_STATUS_OK = `HTTP/1.1 200 OK\r\n`;
exports.HTTP_STATUS_NOT_FOUND = `HTTP/1.1 404 Not Found\r\n`;
exports.CONTENT_TYPE_PLAIN = `Content-Type: text/plain\r\n`;
exports.CONTENT_TYPE_APP = `Content-Type: application/octet-stream\r\n`;
exports.COMPRESSION_SCHEMES = [
    "gzip",
    "deflate",
    "br",
    "compress",
    "identity",
];
exports.endString = "\r\n";
