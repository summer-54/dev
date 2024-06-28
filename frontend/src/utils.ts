export function arrayBufferToBase64String(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

export async function readFile(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async () => {
            if (!reader.result || typeof reader.result === "string") return reject(reader.result);
            resolve(reader.result);
        }
    });
}

export async function readFileBase64(file: File): Promise<string> {
    return arrayBufferToBase64String(await readFile(file));
}