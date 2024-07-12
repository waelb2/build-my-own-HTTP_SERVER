"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_zlib_1 = require("node:zlib");
exports.default = (compressionTypes, data) => {
    const supportsGzip = compressionTypes.includes("gzip");
    return [supportsGzip, (0, node_zlib_1.gzipSync)(data)];
};
