import axios from "axios";
import {SERVER_URL} from "@/api/index.js";
import {ref} from "vue";

export type SearchUserType = {
    username: string,
    codeforcesHandle: string,
    firstName: string,
    lastName: string,
    usernameLength: number,
    codeforcesHandleLength: number,
    firstNameLength: number,
    lastNameLength: number,
    min: number,
    minStr: "username" | "codeforcesHandle" | "firstName" | "lastName"
}

export let me = ref<UserType | null>(null);

export async function register(body: {username: string, firstName: string, lastName: string, codeforcesHandle: string, password: string}) {
    let response = await axios.post<string>(`${SERVER_URL}/users/register`, body);
    if (response.status === 201) {
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
    lastName: string,
    isAdmin: boolean
}

export function hasToken(): boolean {
    return localStorage.getItem("token") !== null;
}

export async function signOut() {
    let response = await axios.post<void>(`${SERVER_URL}/users/signout`, "", {
        headers: {Authorization: localStorage.getItem("token")}
    });
    localStorage.removeItem("token");
}

export async function getMe() {
    if (!localStorage.getItem("token")) return null;
    let response = await axios.get<UserType>(`${SERVER_URL}/me`, {
        headers: {Authorization: localStorage.getItem("token")}
    });
    if (response.status === 200) return response.data;
    return null;
}

export async function isUniqueUsername(username: string): Promise<boolean | null> {
    let response = await axios.get<number>(`${SERVER_URL}/users/is-unique/username/${username}`);
    if (response.status === 200) return Boolean(response.data);
    return null;
}

export async function isUniqueCodeforcesHandle(codeforcesHandle: string): Promise<boolean | null> {
    let response = await axios.get<number>(`${SERVER_URL}/users/is-unique/codeforces-handle/${codeforcesHandle}`);
    if (response.status === 200) return Boolean(response.data);
    return null;
}

export async function patchUser(user: Partial<UserType>): Promise<boolean> {
    try {
        let response = await axios.patch<void>(`${SERVER_URL}/me`, user, {
            headers: {Authorization: localStorage.getItem("token")}
        });
        return response.status === 200;
    }
    catch (error) {
        return false;
    }
}

export async function patchUserPassword(oldPassword: string, newPassword: string): Promise<boolean> {
    try {
        let response = await axios.patch<void>(`${SERVER_URL}/me/password`, {old: oldPassword, new: newPassword}, {
            headers: {Authorization: localStorage.getItem("token")}
        });
        return response.status === 200;
    }
    catch (error) {
        return false;
    }
}

export async function getUserByUsername(username: string) {
    let response = await axios.get<UserType>(`${SERVER_URL}/users/${username}`);
    if (response.status === 200) return response.data;
    return null;
}

export async function searchUser(searchString: string) {
    let response = await axios.get<Array<SearchUserType>>(`${SERVER_URL}/search/${searchString}`);
    if (response.status === 200) return response.data;
    return null;
}

export async function getAllUsers(): Promise<Array<UserType & {id: number}> | null> {
    try {
        let response = await axios.get<Array<UserType & {id: number}>>(`${SERVER_URL}/users`);
        if (response.status !== 200) return null;
        return response.data.sort((a, b) => a.id - b.id);
    } catch (error) {
        return null;
    }
}

export async function adminUsersPatch(data: Array<{id: number, codeforcesHandle?: string}>) {
    await axios.patch(`${SERVER_URL}/users`, data, {headers: {Authorization: localStorage.getItem("token")}});
}

export async function isAdmin() {
    if (localStorage.getItem("token") === null) return false;
    let response = await axios.get<boolean>(`${SERVER_URL}/is-admin`, {headers: {Authorization: localStorage.getItem("token")}});
    if (response.status === 200) return Boolean(response.data);
    return false;
}

export async function makeAdmin(id: number) {
    await axios.patch(`${SERVER_URL}/admin`, `${id}`, {headers: {Authorization: localStorage.getItem("token"), "Content-Type": "text/plain"}});
}