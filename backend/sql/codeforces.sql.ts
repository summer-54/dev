import {db} from "./index.sql.js";
import {getUsernameById} from "./users.sql.js";

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

export type UserResultsContestType = {
    id: number,
    name: string,
    problems: {[title: string]: string},
    standings: Array<{
        taskId: number,
        task: string,
        status: number,
        datetime: Date,
        notOfficial: boolean
    }>,
    problemsDoneCount: number
}

export type UserStatisticsType = {
    perContest: Array<number>,
    hardTasks: Array<number>
}

export async function getAllContests(): Promise<Array<ContestType>> {
    let contests = await db.selectFrom("contests")
        .select(["id", "name"])
        .where("available", '=', true).orderBy("name").execute();
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
        id, name,
        problems: Object.fromEntries(problems.filter(({contest}) => contest === id).map(({title, pdfLink}) => [title, pdfLink])),
        standings: standings.filter(({contest}) => contest === id)
            .map(({user, task, status, datetime, notOfficial}) => ({
                userId: user,
                username: usersMap.get(user) ?? "",
                taskId: task,
                task: problemsMap.get(task) ?? "",
                status, datetime, notOfficial
            }))
    }));
}

export async function getFullStandings(): Promise<FullStandingsType> {
    let contests = await getAllContests();
    return {
        contests: contests.map(({name}) => name),
        standings: {}
    };
}

export async function getContest(id: number): Promise<ContestType | undefined> {
    let contest = await db.selectFrom("contests")
        .select(["id", "name"])
        .where(({eb, and}) => and([
            eb("available", '=', true),
            eb("id", '=', id)
        ])).executeTakeFirst();
    if (!contest) return undefined;
    let problems = await db.selectFrom("problems")
        .select(["id", "contest", "title", "pdfLink"])
        .where(({eb, and}) => and([
            eb("available", '=', true),
            eb("contest", '=', id)
        ])).execute();
    let standings = await db.selectFrom("standings")
        .select(["contest", "user", "task", "status", "datetime", "notOfficial"])
        .where(({eb, and}) => and([
            eb("available", '=', true),
            eb("contest", '=', id)
        ])).execute();
    let problemsMap = new Map<number, string>();
    problems.forEach(({id, title}) => problemsMap.set(id, title));
    let usersMap = new Map<number, string>();
    standings.forEach(({user}) => usersMap.set(user, ""));
    await Promise.all(Array.from(usersMap.keys()).map(async (user) => usersMap.set(user, await getUsernameById(user) ?? "")));
    return {
        id: contest.id,
        name: contest.name,
        problems: Object.fromEntries(problems.filter(({contest}) => contest === id).map(({title, pdfLink}) => [title, pdfLink])),
        standings: standings.filter(({contest}) => contest === id)
            .map(({user, task, status, datetime, notOfficial}) => ({
                userId: user,
                username: usersMap.get(user) ?? "",
                taskId: task,
                task: problemsMap.get(task) ?? "",
                status, datetime, notOfficial
            }))
    }
}

export async function getUserResults(user: number): Promise<Array<UserResultsContestType>> {
    let contests = await getAllContests();
    return contests.map(({id, name, problems, standings}) => ({
        id, name, problems,
        standings: standings.filter(({userId}) => userId === user)
            .map(({task, taskId, status, datetime, notOfficial}) => ({
                task, taskId, status, datetime, notOfficial
            })),
        problemsDoneCount: standings.filter(({userId, status}) => userId === user && status > 0).length
    }));
}

export async function getHardTasks(contest: number, maxSolutionsCount: number = 2): Promise<Array<number>> {
    let solutions = await db.selectFrom("standings").select(["task", "status"])
        .where(({and, eb}) => and([
            eb("available", '=', true),
            eb("contest", '=', contest),
            eb("status", '>', 0)
        ])).execute();
    let taskSolutionsCount = new Map<number, number>();
    solutions.forEach(({task}) => taskSolutionsCount.set(task, (taskSolutionsCount.get(task) ?? 0) + 1));
    return Array.from(taskSolutionsCount.entries()).filter(([_, count]) => count > 0 && count <= maxSolutionsCount)
        .map(([task]) => task);
}

export async function getUserStatistics(user: number): Promise<UserStatisticsType> {
    let userResults = await getUserResults(user);
    let hardTasks = await Promise.all(userResults.map(async ({id}) => await getHardTasks(id)));
    return {
        perContest: userResults.map(({problemsDoneCount}) => problemsDoneCount),
        hardTasks: userResults.map(({standings}, index) => standings
            .filter(({status, taskId}) => status > 0 && hardTasks[index].includes(taskId)).length
        )
    }
}