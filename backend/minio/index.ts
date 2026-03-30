import {Client} from "minio";
import cryptoRandomString from "crypto-random-string";
import crypto from "crypto";

export const minio = new Client({
    endPoint: process.env.MINIO_ENDPOINT ?? "localhost",
    port: Number(process.env.MINIO_PORT ?? 9000),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});

export function generateFileName(fileName: string, content?: Buffer) {
    let file: string;
    let hasher = crypto.createHash("md5");
    if (content) hasher.update(content);
    file = `${cryptoRandomString({length: 8, type: "url-safe"})}_${content ? hasher.digest("hex") : ""}.${fileName}`
    return file;
}

export async function initMinio() {
    const buckets = (await minio.listBuckets()).map(({name}) => name);
    if (!buckets.includes("event-img")) {
        await minio.makeBucket("event-img");
    }
}