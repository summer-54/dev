import {generateFileName, minio} from "./index.js";
import * as Stream from "node:stream";

export async function putImage(filename: string, data: Buffer | Stream.Readable): Promise<string> {
    filename = generateFileName(filename);
    await minio.putObject("event-img", filename, data);
    return filename;
}