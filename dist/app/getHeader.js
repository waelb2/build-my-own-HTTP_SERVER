"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (headers, searchedHeader) => {
    const header = headers.find((header) => header.toLowerCase().startsWith(searchedHeader));
    return header ? header.split(": ")[1] : "Unknown";
};
