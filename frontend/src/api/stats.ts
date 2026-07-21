import axios from "axios";

export async function getUserTSStats(username: string): Promise<Array<number>> {
    const response = await axios.get(`https://contest.inf54.ru/api/get_user_stats?username=${encodeURIComponent(username)}`);
    if (response.status !== 200) return [];
    return response.data;
}