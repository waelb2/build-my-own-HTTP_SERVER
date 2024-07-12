"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
exports.default = async (filePath, data) => {
    return (0, promises_1.writeFile)(filePath, data, { encoding: "utf8" });
};
