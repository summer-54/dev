import axios from "axios";

export async function authWrapper<T>(func: () => Promise<T | null>): Promise<T | null> {
    let res = await func();
    if (res !== null) return res;
    let response = await axios.get<string>("/api/refresh-token");
    if (response.status === 200) {
        localStorage.setItem("token", response.data);
        res = await func();
        return res;
    }
    localStorage.removeItem("token");
    return null;
}