import axios from "axios";
import {authWrapper} from "@/api/authWrapper.js";
import {SERVER_URL} from "@/serverConfig.js";

export type EventType = {
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
    "my": boolean,
    "registerStart": string | null,
    "registerEnd": string | null,
    "datetime": string | null,
    "formFields": Array<{
        key: string,
        title: string,
        ref?: Array<any>,
        optional?: boolean
    } & ({
        type: "text",
        min?: number,
        max?: number,
        pattern?: string
    } | {
        type: "int",
        min?: number,
        max?: number
    } | {
        type: "float",
        min?: number,
        max?: number
    } | {
        type: "date",
        min?: string,
        max?: string
    } | {
        type: "datetime",
        min?: string,
        max?: string
    } | {
        type: "select",
        variants: Array<any>
    })>
}

export type EventResponseType = {
    "id": number,
    "event": string,
    "user": number,
    "formFields": Record<string, string | number>,
    "originalFormFields": Record<string, string>,
    "accepted": boolean,
    "rejected": boolean,
    "visited": boolean,
    "datetime": string,
    "editDatetime": string
}

export async function getEvents(): Promise<Array<Omit<EventType, "formFields">> | false | null> {
    return await authWrapper(async () => {
        const response = await axios.get<Array<Omit<EventType, "formFields">>>(`${SERVER_URL}/events`, {headers: {Authorization: localStorage.getItem("token")}});
        if (response.status == 401) return null;
        if (response.status != 200) return false;
        return response.data;
    });
}

export async function getEvent(id: string): Promise<EventType | false | null> {
    return await authWrapper(async () => {
        const response = await axios.get<EventType>(`${SERVER_URL}/events/${id}`, {headers: {Authorization: localStorage.getItem("token")}});
        if (response.status == 401) return null;
        if (response.status != 200) return false;
        return response.data;
    });
}

export async function register(responses: Record<string, string | number>, id: string) {
    return await authWrapper(async () => {
        const response = await axios.post<EventType>(`${SERVER_URL}/events/${id}`, responses, {headers: {Authorization: localStorage.getItem("token")}});
        if (response.status == 401) return null;
        if (response.status != 200) return false;
        return response.data;
    });
}

export async function getMyResponses(id: string) {
    return await authWrapper(async () => {
        const response = await axios.get<Array<EventResponseType>>(`${SERVER_URL}/events/${id}/my-responses`, {headers: {Authorization: localStorage.getItem("token")}});
        if (response.status == 401) return null;
        if (response.status != 200) return false;
        return response.data;
    });
}

export async function editResponse(responses: Record<string, string | number>, id: string, rid: number) {
    return await authWrapper(async () => {
        const response = await axios.patch<EventType>(`${SERVER_URL}/events/${id}/response/${rid}`, responses, {headers: {Authorization: localStorage.getItem("token")}});
        if (response.status == 401) return null;
        if (response.status != 200) return false;
        return response.data;
    });
}