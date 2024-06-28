import axios from "axios";

const SERVER_URL: string = "http://localhost:80/api";

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
    fullText: string
    images: []
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
    let request = await axios.get<{id: number, title: string, description: string, img?: string, datetime: string, fullText: string, images: []}>(`${SERVER_URL}/news/${id}`);
    if (request.status !== 200) return undefined;
    return {
        ...request.data,
        datetime: new Date(request.data.datetime),
        // @ts-ignore
        img: request.data.img ? request.data.img.replaceAll("%SERVER%", SERVER_URL) : undefined,
        // @ts-ignore
        fullText: request.data.fullText.replaceAll("%SERVER%", SERVER_URL)
    };
}