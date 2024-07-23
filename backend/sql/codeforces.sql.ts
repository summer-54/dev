import {db} from "./index.sql.js";
import {getUsernameById} from "./users.sql.js";

export type FullContestType = {
    name: string,
    problems: {[title: string]: string},
    standings: Array<{
        user: string,
        task: string,
        status: number,
        datetime: Date,
        notOfficial: boolean
    }>
}

export async function getFullStandings(): Promise<Array<FullContestType>> {
    let contests = await db.selectFrom("contests")
        .select(["id", "name"])
        .where("available", '=', true).execute();
    let problems = await db.selectFrom("problems")
        .select(["id", "contest", "title", "pdfLink"])
        .where("available", '=', true).execute();
    let standings = await db.selectFrom("standings")
        .select(["contest", "user", "task", "status", "datetime", "notOfficial"])
        .where("available", '=', true).execute();
    let problemsMap = new Map<number, string>();
    problems.forEach(({id, title}) => problemsMap.set(id, title));
    let usersMap = new Map<number, string>();
    standings.forEach(({user}) => usersMap.set(user, ""));
    await Promise.all(Array.from(usersMap.keys()).map(async (user) => usersMap.set(user, await getUsernameById(user) ?? "")));
    return contests.map(({name, id}) => ({
        name,
        problems: Object.fromEntries(problems.filter(({contest}) => contest === id).map(({title, pdfLink}) => [title, pdfLink])),
        standings: standings.filter(({contest}) => contest === id)
            .map(({user, task, status, datetime, notOfficial}) => ({
                user: usersMap.get(user) ?? "",
                task: problemsMap.get(task) ?? "",
                status, datetime, notOfficial
            }))
    }));
}