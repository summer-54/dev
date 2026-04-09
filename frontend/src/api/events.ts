import axios from "axios";
import {authWrapper} from "@/api/authWrapper.js";
import {SERVER_URL} from "@/serverConfig.js";

export type Event = {
    "id": string,
    "imgUrl": string,
    "displayName": string,
    "description": string,
    "showInList": boolean,
    "opened": boolean,
    "editable": boolean,
    "account": boolean,
    "summaryUrl": string,
    "type": "admin" | "my" | "open",
    "registerStart": string | null,
    "registerEnd": string | null,
    "datetime": string | null,
    "formFields": object
}

export async function getEvents(): Promise<Array<Omit<Event, "formFields">> | false | null> {
    return await authWrapper(async () => {
        const response = await axios.get<Array<Omit<Event, "formFields">>>(`${SERVER_URL}/events`, {headers: {Authorization: localStorage.getItem("token")}});
        if (response.status == 401) return null;
        if (response.status != 200) return false;
        return response.data;
    });
}

export async function getEvent(id: string): Promise<Event | false | null> {
    return await authWrapper(async () => {
        const response = await axios.get<Event>(`${SERVER_URL}/events/${id}`, {headers: {Authorization: localStorage.getItem("token")}});
        if (response.status == 401) return null;
        if (response.status != 200) return false;
        return response.data;
    });
}