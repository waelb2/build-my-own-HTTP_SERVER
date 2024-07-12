export const HTTP_STATUS_CREATED: string = `HTTP/1.1 201 Created\r\n`;
export const HTTP_STATUS_OK: string = `HTTP/1.1 200 OK\r\n`;
export const HTTP_STATUS_NOT_FOUND: string = `HTTP/1.1 404 Not Found\r\n`;
export const CONTENT_TYPE_PLAIN: string = `Content-Type: text/plain\r\n`;
export const CONTENT_TYPE_APP: string = `Content-Type: application/octet-stream\r\n`;
export const COMPRESSION_SCHEMES: string[] = [
  "gzip",
  "deflate",
  "br",
  "compress",
  "identity",
];
export const endString = "\r\n";
