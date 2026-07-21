import axios from "axios";
import {SERVER_URL} from "@/serverConfig.js";
import {ref} from "vue";
import {authWrapper} from "@/api/authWrapper.js";

axios.defaults.validateStatus = () => true;

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

export async function registerStart(email: string) {
    let response = await axios.post<string>(`${SERVER_URL}/users/register-start`, {email});
    if (response.status === 200) return 0;
    if (response.status === 400) return 1;
    if (response.status === 409) return 2;
    return 3;
}

export async function emailConfirm(email: string, code: string) {
    let response = await axios.post<string>(`${SERVER_URL}/users/email-confirm`, {email, code});
    if (response.status !== 200) return null;
    return response.data;
}

export async function register(body: {username: string, firstName: string, lastName: string, codeforcesHandle: string, emailToken: string, password: string}) {
    let response = await axios.post<string>(`${SERVER_URL}/users/register`, body);
    if (response.status === 201) {
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
    return response.status === 200;
}

export type UserType = {
    username: string,
    codeforcesHandle: string,
    firstName: string,
    lastName: string,
    isAdmin: boolean
}

export async function hasToken(): Promise<boolean> {
    return await authWrapper(async () => {
        if (localStorage.getItem("token") !== null) return true;
        return null;
    }) ?? false;
}

export async function signOut() {
    await authWrapper(async () => {
        let response = await axios.post<void>(`${SERVER_URL}/users/signout`, "", {headers: {Authorization: localStorage.getItem("token")}});
        if (response.status === 401) return null;
    });
    localStorage.removeItem("token");
}

export async function getMe() {
    if (!localStorage.getItem("token")) return null;
    return (await authWrapper(async () => {
        let response = await axios.get<UserType>(`${SERVER_URL}/me`, {
            headers: {Authorization: localStorage.getItem("token")}
        });
        if (response.status === 200) return response.data;
        if (response.status === 401) return null;
    })) ?? null;
}

export async function isUniqueUsername(username: string): Promise<boolean | null> {
    let response = await axios.get<number>(`${SERVER_URL}/users/is-unique/username/${username}`);
    if (response.status === 200) return Boolean(response.data);
    return null;
}

export async function isUniqueEmail(email: string): Promise<boolean | null> {
    let response = await axios.get<number>(`${SERVER_URL}/users/is-unique/email/${email}`);
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
        return await authWrapper(async () => {
            let response = await axios.patch<void>(`${SERVER_URL}/me`, user, {
                headers: {Authorization: localStorage.getItem("token")}
            });
            if (response.status === 401) return null;
            return response.status === 200;
        }) ?? false;
    }
    catch (error) {
        return false;
    }
}

export async function patchUserPassword(oldPassword: string, newPassword: string): Promise<boolean> {
    try {
        return await authWrapper(async () => {
            let response = await axios.patch<void>(`${SERVER_URL}/me/password`, {old: oldPassword, new: newPassword}, {
                headers: {Authorization: localStorage.getItem("token")}
            });
            if (response.status === 401) return null;
            return response.status === 200;
        }) ?? false;
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
    await authWrapper(async () => {
        let response = await axios.patch(`${SERVER_URL}/users`, data, {headers: {Authorization: localStorage.getItem("token")}});
        if (response.status === 401) return null;
    });
}

export async function isAdmin() {
    if (localStorage.getItem("token") === null) return false;
    return await authWrapper(async () => {
        let response = await axios.get<number>(`${SERVER_URL}/is-admin`, {headers: {Authorization: localStorage.getItem("token")}});
        if (response.status === 401) return null;
        if (response.status === 200) return Boolean(response.data);
        return false;
    }) ?? false;
}

export async function makeAdmin(id: number) {
    await authWrapper(async () => {
        let response = await axios.patch(`${SERVER_URL}/admin`, `${id}`, {headers: {Authorization: localStorage.getItem("token"), "Content-Type": "text/plain"}});
        if (response.status === 401) return null;
    });
}