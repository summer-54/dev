import fs from "node:fs/promises";

export async function addAttachment(path: string, data: string): Promise<void> {
    try {
        await fs.mkdir(path.split('/').filter((_, index, arr) => index < arr.length - 1).join('/'), {recursive: true});
    } catch (e) {
    }
    await fs.writeFile(path, data, {encoding: "base64"});
}