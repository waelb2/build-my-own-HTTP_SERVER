import { writeFile } from "node:fs/promises";
export default async (filePath: string, data: string) => {
  return writeFile(filePath, data, { encoding: "utf8" });
};
