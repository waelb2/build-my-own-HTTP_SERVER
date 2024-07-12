"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globalVars_1 = require("./globalVars");
const writeFile_1 = __importDefault(require("./writeFile"));
exports.default = async (URLPath, fileName, body) => {
    let response = "";
    if (URLPath === `/files/${fileName}`) {
        // handle posting (uploading) a file
        const args = process.argv.slice(2);
        const [___, filePath] = args;
        try {
            await (0, writeFile_1.default)(filePath + "/" + fileName, body);
            response = (globalVars_1.HTTP_STATUS_CREATED + globalVars_1.endString);
        }
        catch (error) {
            response = "";
            console.log(error);
        }
    }
    return response;
};
