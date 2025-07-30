import axios from "axios";
import {SERVER_URL} from "@/serverConfig.js";
import {RSAEncrypt} from "scryptex";
import {getKey} from "@/api/users.js";

export async function requestRecovery(email: string): Promise<boolean> {
    try {
        let response = await axios.patch<void>(`${SERVER_URL}/recovery`, {email});
        return response.status === 200;
    }
    catch (error) {
        return false;
    }
}

export async function recovery(token: string, password: string): Promise<boolean> {
    try {
        let {key, id} = await getKey();
        let response = await axios.patch<string>(`${SERVER_URL}/recovery/${token}`, {password: RSAEncrypt(password, key), keyId: id});
        if (response.status === 200) {
            localStorage.setItem("token", response.data);
            return true;
        }
        return false;
    }
    catch (error) {
        return false;
    }
}