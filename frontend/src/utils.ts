import {ref} from "vue";

export function arrayBufferToBase64String(buffer: ArrayBuffer): string {
    let binary = '';
    let bytes = new Uint8Array( buffer );
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
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

export const themeName = ref<"light" | "dark">();