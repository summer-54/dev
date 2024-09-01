import axios from "axios";
import {readFileBase64} from "@/utils.js";
import {SERVER_URL, SERVER_WS_URL} from "@/serverConfig.js";

export type NewsType = Array<{
    id: number,
    title: string,
    description: string,
    img?: string,
    datetime: Date
}>

export type NewType = {
    id: number,
    title: string,
    description: string,
    img?: string,
    datetime: Date,
    fullText: string,
    images: Array<string>
}

export async function getNews(length?: number, offset?: number): Promise<NewsType> {
    let query = (length !== undefined ? `length=${length}` : "") + (length !== undefined && offset !== undefined ? "&" : "") + (offset !== undefined ? `offset=${offset}` : "");
    let request = await axios.get<Array<{id: number, title: string, description: string, img?: string, datetime: string}>>(`${SERVER_URL}/news${query ? "?" + query : ""}`);
    return request.data.map(({id, img, datetime, ...data}) => ({
        // @ts-ignore
        img: img ? img.replaceAll("%SERVER%", SERVER_URL) : undefined,
        datetime: new Date(datetime),
        id, ...data
    }));
}

export async function getNew(id: number): Promise<NewType | undefined> {
    let request = await axios.get<{id: number, title: string, description: string, img?: string, datetime: string, fullText: string, images: Array<{id: number, newId: number, image: string}>}>(`${SERVER_URL}/news/${id}`);
    if (request.status !== 200) return undefined;
    return {
        ...request.data,
        datetime: new Date(request.data.datetime),
        // @ts-ignore
        img: request.data.img ? request.data.img.replaceAll("%SERVER%", SERVER_URL) : undefined,
        // @ts-ignore
        fullText: request.data.fullText.replaceAll("%SERVER%", SERVER_URL),
        images: request.data.images.map(({image}) => image.replaceAll("%SERVER%", SERVER_URL))
    };
}

export type PostNewType = {
    title: string,
    description: string,
    img?: string,
    fullText: string,
    images?: Array<string>,
    attachments?: {[key: string]: File}
}

export async function postNew({attachments, ...data}: PostNewType): Promise<void> {
    let newAttachments: {[key: string]: string} = {};
    for (const key in attachments) {
        newAttachments[key] = await readFileBase64(attachments[key]);
    }
    await axios.post(SERVER_URL + "/news", {
        ...data,
        attachments: newAttachments
    }, {headers: {Authorization: localStorage.getItem("token")}});
}

export async function patchNew(id: number, data: PostNewType): Promise<boolean> {
    let newAttachments: {[key: string]: string} = {};
    for (const key in data.attachments) {
        newAttachments[key] = await readFileBase64(data.attachments[key]);
    }
    try {
        let request = await axios.patch(`${SERVER_URL}/news/${id}`, {...data, attachments: newAttachments}, {headers: {Authorization: localStorage.getItem("token")}});
        return request.status === 200;
    } catch (error) {
        return false;
    }
}

export async function removeNew(id: number) {
    await axios.delete(`${SERVER_URL}/news/${id}`, {headers: {Authorization: localStorage.getItem("token")}});
}

export function websocketNews(updateNewHandler: (article: NewType) => void, deleteHandler: (id: number) => void) {
    let connection = new WebSocket(`${SERVER_WS_URL}/news`);
    connection.onmessage = (e: MessageEvent) => {
        let data = JSON.parse(e.data);
        if ("delete" in data && typeof data.delete === "number") deleteHandler(data.delete);
        else updateNewHandler(data);
    }
}