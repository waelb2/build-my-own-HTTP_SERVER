import readFile from "./readFile";
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_NOT_FOUND,
  endString,
  CONTENT_TYPE_APP,
  CONTENT_TYPE_PLAIN,
} from "./globalVars";
import getHeader from "./getHeader";
import validCompression from "./validCompression";
import gzipCompress from "./gzipCompress";

export default async (
  URLPath: string,
  query: string,
  headers: string[],
): Promise<[string, string | Buffer]> => {
  let response: string = "";
  let body: string | Buffer = "";

  const [acceptsEncoding, validCompressions] = validCompression(headers);
  const validCompressionValue =
    acceptsEncoding && validCompressions.length != 0;
  const omitBody: boolean = acceptsEncoding;
  if (URLPath === "/") {
    // handle root path request
    response = HTTP_STATUS_OK + endString;
  } else if (URLPath === "/user-agent") {
    // handle GET-User-Agent request
    const userAgent = getHeader(headers, "user-agent: ");
    response = HTTP_STATUS_OK + CONTENT_TYPE_PLAIN;
    if (validCompressionValue) {
      response += `Content-Encoding: ${validCompressions[0]}\r\n` + endString;
    } else if (!omitBody) {
      response += `Content-Length: ${userAgent.length}\r\n` + endString;
      body = userAgent;
    } else {
      response += endString;
    }
  } else if (URLPath === `/echo/${query}`) {
    // handle echo request
    const [supportsGzip, compressedDataRaw] = gzipCompress(
      validCompressions,
      query,
    );

    response = HTTP_STATUS_OK + CONTENT_TYPE_PLAIN;
    if (validCompressionValue) {
      response += `Content-Encoding: ${validCompressions[0]}\r\n`;
      if (supportsGzip) {
        response +=
          `Content-Length: ${compressedDataRaw.length}\r\n` + endString;
        body = compressedDataRaw;
      }
    } else if (!omitBody) {
      response += `Content-Length: ${query.length}\r\n` + endString;
      body = query;
    } else {
      response += endString;
    }
  } else if (URLPath === `/files/${query}`) {
    // handle file request
    try {
      const args = process.argv.slice(2);
      const [___, filePath] = args;
      const data = await readFile(filePath + "/" + query);
      const dataSize = Buffer.byteLength(data, "utf8");
      response =
        HTTP_STATUS_OK +
        CONTENT_TYPE_APP +
        `Content-Length: ${dataSize}\r\n` +
        endString;
      body = data;
    } catch (error) {
      response = HTTP_STATUS_NOT_FOUND + endString;
    }
  } else {
    response = HTTP_STATUS_NOT_FOUND + endString;
  }
  return [response, body];
};
