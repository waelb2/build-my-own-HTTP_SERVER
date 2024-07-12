import { readFile } from "node:fs/promises";
export default async (filePath: string) => {
  return readFile(filePath, { encoding: "utf8" });
};
