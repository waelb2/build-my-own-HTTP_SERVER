"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
exports.default = async (filePath) => {
    return (0, promises_1.readFile)(filePath, { encoding: "utf8" });
};
