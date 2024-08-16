import {db} from "./index.sql.js";
import {getUsernameById} from "./users.sql.js";
import {addAttachment} from "../attachments.js";

export type ContestType = {
    id: number,
    name: string,
    solutionsPublishDatetime?: Date,
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

export type UserResultsContestType = {
    id: number,
    name: string,
    solutionsPublishDatetime?: Date,
    solutionsVideoId?: string,
    problemsPdfLink?: string,
    problems: {[title: string]: string},
    standings: Array<{
        taskId: number,
        task: string,
        status: number,
        datetime: Date,
        notOfficial: boolean
    }>,
    problemsDoneCount: number,
    attemptsCount: number
}

export type UserStatisticsType = {
    perContest: Array<number>,
    hardTasks: Array<number>,
    attemptsCountPerTask: Array<number>
}

export async function getAllContests(): Promise<Array<ContestType>> {
    let contests = await db.selectFrom("contests")
        .select(["id", "name", "solutionsPublishDatetime", "solutionsVideoId", "problemsPdfLink"])
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
    return contests.map(({name, id, solutionsPublishDatetime, solutionsVideoId, problemsPdfLink}) => ({
        id, name, solutionsPublishDatetime, solutionsVideoId, problemsPdfLink,
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
    let res = {} as {[user: string]: Array<number>};
    for(let i = 0; i < contests.length; i++){
        let before_solution = new Map<string, Set<string>>();
        let after_solution = new Map();
        let problem_amount = Object.keys(contests[i].problems).length;
        for(let j = 0; j < contests[i].standings.length; j++){
            if(contests[i].standings[j].status <= 0) continue;
            if(new Date(contests[i].standings[j].datetime) <= new Date()){ // SOLUTION POSTED DATE&TIME
                if(before_solution.get(contests[i].standings[j].username) === undefined){
                    before_solution.set(contests[i].standings[j].username, new Set());
                }
                console.log(`Added ${contests[i].standings[j].task} to user ${contests[i].standings[j].username} (before)`);
                before_solution.get(contests[i].standings[j].username)?.add(contests[i].standings[j].task);
            } else if(new Date(contests[i].standings[j].datetime) <= new Date()) { // RESULTS POSTED DATE&TIME
                if(after_solution.get(contests[i].standings[j].username) === undefined){
                    after_solution.set(contests[i].standings[j].username, new Set());
                }
                console.log(`Added ${contests[i].standings[j].task} to user ${contests[i].standings[j].username} (after)`);
                after_solution.get(contests[i].standings[j].username)?.add(contests[i].standings[j].task);
            }
        }
        for(const key of Array.from(before_solution.keys())){
            console.log(`Calculating scores ${key}`);
            if(res[key] === undefined){
                res[key] = [];
            }
            res[key][i] = 60*(before_solution.get(key)?.size ?? 0)/problem_amount;
            if(after_solution.get(key) === undefined) continue;
            let after_solution_tasks = 0;
            for(let val in after_solution.get(key)){
                if(before_solution.get(key)?.has(val)) continue;
                after_solution_tasks++;
            }
            res[key][i] += 30*after_solution_tasks/problem_amount;
        }
        for(const key in Array.from(after_solution.keys())){
            if(before_solution.get(key) !== undefined) continue;
            res[key][i] = 30*(after_solution.get(key)?.size ?? 0)/problem_amount;
        }
    }
    return {
        contests: contests.map(({name}) => name),
        standings: res
    };
}

export async function getContest(id: number): Promise<ContestType | undefined> {
    let contest = await db.selectFrom("contests")
        .select(["id", "name", "solutionsPublishDatetime", "solutionsVideoId", "problemsPdfLink"])
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
        solutionsPublishDatetime: contest.solutionsPublishDatetime,
        solutionsVideoId: contest.solutionsVideoId,
        problemsPdfLink: contest.problemsPdfLink,
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
    let res = [] as Array<UserResultsContestType>;
    for(let i = 0; i < contests.length; i++){
        res.push({} as UserResultsContestType);
        let cur = contests[i];
        res[i].id = cur.id; 
        res[i].name = cur.name;
        res[i].solutionsPublishDatetime = cur.solutionsPublishDatetime;
        res[i].solutionsVideoId = cur.solutionsVideoId;
        res[i].problemsPdfLink = cur.problemsPdfLink;
        res[i].problems = cur.problems;
        res[i].standings = cur.standings.filter(({userId}) => userId === user)
            .map(({task, taskId, status, datetime, notOfficial}) => ({
                task, taskId, status, datetime, notOfficial
            }));
        let solved = new Set<string>(), attemptsSum = 0;
        for(let j of res[i].standings){
            // TODO: Check if submission was before results
            attemptsSum += Math.abs(j.status);
            if(j.status <= 0) continue;
            solved.add(j.task);
        }
        res[i].problemsDoneCount = solved.size;
        res[i].attemptsCount = attemptsSum / Object.keys(cur.problems).length;
    }
    return res;
    // return contests.map(({id, name, problems, standings}) => ({
    //     id, name, problems,
    //     standings: standings.filter(({userId}) => userId === user)
    //         .map(({task, taskId, status, datetime, notOfficial}) => ({
    //             task, taskId, status, datetime, notOfficial
    //         })),
    //     problemsDoneCount: standings.filter(({userId, status}) => userId === user && status > 0).length
    // }));
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
        perContest: userResults.map(({problemsDoneCount, problems}) => problemsDoneCount / Object.keys(problems).length * 100),
        hardTasks: userResults.map(({standings, problems}, index) => (new Set(standings
            .filter(({status, taskId}) => status > 0 && hardTasks[index].includes(taskId))
            .map(({task}) => task))).size / Object.keys(problems).length * 100
        ),
        attemptsCountPerTask: userResults.map(({attemptsCount}) => attemptsCount)
    }
}

export async function patchContests(data: Array<{
    id: number,
    problemsPdf?: string,
    solutionsPublishDatetime?: string | Date,
    solutionsVideoId?: string
}>) {
    await Promise.all(data.map(async ({id, problemsPdf, solutionsVideoId, solutionsPublishDatetime}) => {
        if (problemsPdf) {
            await addAttachment(`./contestsProblems/${id}.pdf`, problemsPdf);
            await db.updateTable("contests").where("id", '=', id).set({problemsPdfLink: `%SERVER%/problems/${id}.pdf`}).execute();
        }
        if (solutionsVideoId) await db.updateTable("contests").where("id", '=', id).set({solutionsVideoId}).execute();
        if (solutionsPublishDatetime) await db.updateTable("contests").where("id", '=', id).set({solutionsPublishDatetime}).execute();
    }));
}