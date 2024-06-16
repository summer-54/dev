import {CodeforcesAPI} from "codeforces-api-ts";

CodeforcesAPI.setCredentials({
    API_KEY: "f890b8ce2fcbe718d74ab040856610cb914b9cd9",
    API_SECRET: "853c708f1ae07b3a9a20a9ab18f2ca4e9eb8c626",
});

export async function getStandings(contestId: number): Promise<any> {
    return CodeforcesAPI.call("contest.standings", {contestId});
}

export async function test(): Promise<any> {
    console.log(await CodeforcesAPI.call("user.info", {handles: "sizoff"}));
    console.log(await getStandings(528663));
}