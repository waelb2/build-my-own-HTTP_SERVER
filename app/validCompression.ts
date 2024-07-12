import { COMPRESSION_SCHEMES } from "./globalVars";
import getHeader from "./getHeader";

export default (headers: string[]): [boolean, string[]] => {
  const encodingHeader: string = getHeader(headers, "accept-encoding: ");
  const acceptsEncoding: boolean = encodingHeader !== "Unknown";
  let validCompressions: string[] = [];
  if (acceptsEncoding) {
    const values: string[] = encodingHeader.split(", ");
    for (const value of values) {
      if (COMPRESSION_SCHEMES.includes(value.toLowerCase().trim())) {
        validCompressions.push(value);
      }
    }
  }
  return [acceptsEncoding, validCompressions];
};
