import {RSA} from "scryptex";

export const rsaKeys: Array<RSA> = []
const keyQueue: Array<number> = []

export function addKey(): {key: string, id: number} {
    let rsa = new RSA(), id = 0;
    if (keyQueue.length < 1) {
        id = rsaKeys.length;
        rsaKeys.push(rsa);
    }
    else {
        id = keyQueue.shift() ?? 0;
        rsaKeys[id] = rsa;
    }
    return {key: rsa.publicKey, id};
}

export function removeKey(id: number) {
    keyQueue.push(id);
}