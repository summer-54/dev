import axios from "axios";
import {SERVER_URL} from "@/serverConfig.js";

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
        let response = await axios.patch<string>(`${SERVER_URL}/recovery/${token}`, {password: password});
        return response.status === 200;

    }
    catch (error) {
        return false;
    }
}