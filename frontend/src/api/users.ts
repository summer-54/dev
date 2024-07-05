import axios from "axios";
import {SERVER_URL} from "@/api/index.js";

export async function register(body: {username: string, firstName: string, lastName: string, codeforcesHandle: string, password: string}) {
    let response = await axios.post<string>(`${SERVER_URL}/users/register`, body);
    if (response.status === 200) {
        localStorage.setItem("token", response.data);
        return 0;
    }
    if (response.status === 409) {
        if (response.data === "username") return 1;
        else return 2;
    }
    return -1;
}

export async function signIn(username: string, password: string) {
    let response = await axios.post<string>(`${SERVER_URL}/users/signin`, {username, password});
    if (response.status === 200) {
        localStorage.setItem("token", response.data);
        return true;
    }
    return false;
}

export type UserType = {
    username: string,
    codeforcesHandle: string,
    firstName: string,
    lastName: string
}

export type MeType = UserType & {
    id: number
}

export async function getMe() {
    if (!localStorage.getItem("token")) return null;
    let response = await axios.get<MeType>(`${SERVER_URL}/me`, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
    if (response.status === 200) return response.data;
    return null;
}

export async function getUserByUsername(username: string) {
    let response = await axios.get<MeType>(`${SERVER_URL}/users/${username}`);
    if (response.status === 200) return response.data;
    return null;
}