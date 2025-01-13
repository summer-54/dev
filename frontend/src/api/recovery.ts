import axios from "axios";
import {SERVER_URL} from "@/serverConfig.js";

export async function recovery(email: string): Promise<boolean> {
    try {
        let response = await axios.patch<void>(`${SERVER_URL}/recovery`, {email}, {
            headers: {Authorization: localStorage.getItem("token")}
        });
        return response.status === 200;
    }
    catch (error) {
        return false;
    }
}