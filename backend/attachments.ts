import fs from "node:fs";

export async function addAttachment(path: string, data: string): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            fs.mkdirSync(path.split('/').filter((_, index, arr) => index < arr.length - 1).join('/'));
        } catch (e) {}
        fs.writeFile(path, data, {encoding: "utf8"}, err => {
            if (err) return reject(err);
            resolve(undefined);
        });
    });
}