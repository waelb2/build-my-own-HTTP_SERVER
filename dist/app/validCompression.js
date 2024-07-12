"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globalVars_1 = require("./globalVars");
const getHeader_1 = __importDefault(require("./getHeader"));
exports.default = (headers) => {
    const encodingHeader = (0, getHeader_1.default)(headers, "accept-encoding: ");
    const acceptsEncoding = encodingHeader !== "Unknown";
    let validCompressions = [];
    if (acceptsEncoding) {
        const values = encodingHeader.split(", ");
        for (const value of values) {
            if (globalVars_1.COMPRESSION_SCHEMES.includes(value.toLowerCase().trim())) {
                validCompressions.push(value);
            }
        }
    }
    return [acceptsEncoding, validCompressions];
};
