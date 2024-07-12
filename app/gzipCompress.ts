import { gzipSync } from "node:zlib";
export default (
  compressionTypes: string[],
  data: string,
): [boolean, Buffer] => {
  const supportsGzip: boolean = compressionTypes.includes("gzip");
  return [supportsGzip, gzipSync(data)];
};
