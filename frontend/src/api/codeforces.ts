import axios from "axios";
import {SERVER_URL} from "@/api/index";

export type ContestType = {
    id: number,
    name: string,
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
    hardTasks: Array<number>
}

export async function getAllContests(): Promise<Array<ContestType>> {
    return (await axios.get<Array<ContestType>>(`${SERVER_URL}/contests`)).data;
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