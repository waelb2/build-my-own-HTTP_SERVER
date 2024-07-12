import { endString, HTTP_STATUS_CREATED } from "./globalVars";
import writeFile from "./writeFile";
export default async (URLPath: string, fileName: string, body: string) => {
  let response: string = "";
  if (URLPath === `/files/${fileName}`) {
    // handle posting (uploading) a file
    const args = process.argv.slice(2);
    const [___, filePath] = args;
    try {
      await writeFile(filePath + "/" + fileName, body);
      response = (HTTP_STATUS_CREATED + endString) as string;
    } catch (error) {
      response = "";
      console.log(error);
    }
  }
  return response;
};
