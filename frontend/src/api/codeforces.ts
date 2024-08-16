import axios from "axios";
import {SERVER_URL} from "@/api/index";
import {readFileBase64} from "@/utils.js";

export type ContestType = {
    id: number,
    name: string,
    solutionsPublishDatetime?: string,
    solutionsVideoId?: string,
    problemsPdfLink?: string,
    problems: {[title: string]: string},
    standings: Array<{
        userId: number,
        username: string,
        taskId: number,
        task: string,
        status: number,
        datetime: Date,
        notOfficial: boolean
    }>
}

export type FullStandingsType = {
    contests: Array<string>,
    standings: {[user: string]: Array<number>}
}

export type UserStatisticsType = {
    perContest: Array<number>,
    hardTasks: Array<number>,
    attemptsCountPerTask: Array<number>
}

export async function getAllContests(): Promise<Array<ContestType>> {
    let data = (await axios.get<Array<ContestType>>(`${SERVER_URL}/contests`)).data;
    data = data.map(({solutionsPublishDatetime, ...other}) => ({solutionsPublishDatetime: solutionsPublishDatetime?.substring(0, 16), ...other}));
    return data;
}

export async function getFullStandings(): Promise<FullStandingsType> {
    return (await axios.get<FullStandingsType>(`${SERVER_URL}/standings`)).data;
}

export async function getContest(id: number): Promise<ContestType | undefined> {
    try {
        return (await axios.get<ContestType>(`${SERVER_URL}/contests/${id}`)).data;
    } catch (error) {return;}
}

export async function getUserStatistics(username: string): Promise<UserStatisticsType> {
    return (await axios.get<UserStatisticsType>(`${SERVER_URL}/statistics/${username}`)).data;
}

export async function patchContests(data: Array<{
    id: number,
    problemsPdf?: File,
    solutionsPublishDatetime?: string,
    solutionsVideoId?: string
}>): Promise<boolean> {
    try {
        let response = await axios.patch(`${SERVER_URL}/contests`, await Promise.all(data.map(async ({problemsPdf, ...other}) => ({problemsPdf: problemsPdf ? await readFileBase64(problemsPdf) : undefined, ...other}))));
        return response.status === 200;
    } catch (error) {
        return false;
    }
}