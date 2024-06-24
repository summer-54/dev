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
}

export async function getNews(length?: number, offset?: number): Promise<NewsType> {
    let query = (length !== undefined ? `length=${length}` : "") + (length !== undefined && offset !== undefined ? "&" : "") + (offset !== undefined ? `offset=${offset}` : "");
    let request = await axios.get<Array<{id: number, title: string, description: string, img?: string, datetime: string}>>(`${SERVER_URL}/news${query ? "?" + query : ""}`);
    return request.data.map(({id, img, datetime, ...data}) => ({
        img: img ? `${SERVER_URL}/news/${id}/${img}` : undefined,
        datetime: new Date(datetime),
        id, ...data
    }));
}

export async function getNew(id: number): Promise<NewType | undefined> {
    let request = await axios.get<{id: number, title: string, description: string, img?: string, datetime: string, fullText: string}>(`${SERVER_URL}/news/${id}`);
    if (request.status !== 200) return undefined;
    return {
        ...request.data,
        datetime: new Date(request.data.datetime),
        img: request.data.img ? `${SERVER_URL}/news/${id}/${request.data.img}` : undefined,
        // @ts-ignore
        fullText: request.data.fullText.replaceAll("%SERVER%", SERVER_URL)
    };
}