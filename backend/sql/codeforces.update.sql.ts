// import {Standings, StandingsRow} from "../codeforces.js";
import {db} from "./index.sql.js";
import {getCodeforcesHandleUserIdMap} from "./users.sql.js";
import fs from "node:fs/promises";

// export async function getContestId(groupId: string, contestId: number): Promise<number | undefined> {
//     return (await db.selectFrom("contests").select(["id"]).where(({and, eb}) => and([
//         eb("contestId", '=', contestId),
//         eb("groupId", '=', groupId)
//     ])).executeTakeFirst())?.id;
// }
//
// export async function getContestProblems(contest: number): Promise<Array<number>> {
//     return (await db.selectFrom("problems").select(["id"]).where("contest", '=', contest).execute())
//         .map(({id}) => id);
// }
//
// export async function getStandingsRow(contest: number, user: number, task: number): Promise<[number, number]> {
//     let row = await db.selectFrom("standings").where(({eb, and}) => and([
//         eb("contest", '=', contest),
//         eb("user", '=', user),
//         eb("task", '=', task)
//     ])).select(["id", "status"]).executeTakeFirst();
//     return [row?.id ?? 0, row ? row.status : 0];
// }
//
// export async function createContestStandingsRow(contest: number, user: number, task: number, status: number, notOfficial: boolean): Promise<void> {
//     console.log("createContestStandingsRow", "contest:", contest, "user:", user, "task:", task, "notOfficial:", notOfficial, status);
//     await db.insertInto("standings").values({contest, user, task, status, notOfficial, datetime: new Date()}).execute();
// }
//
// export async function updateContestStandingsRow(contest: number, user: number, task: number, status: number, notOfficial: boolean): Promise<void> {
//     let [id, oldStatus] = await getStandingsRow(contest, user, task);
//     if (id <= 0) return createContestStandingsRow(contest, user, task, status, notOfficial);
//     if (Math.abs(oldStatus) >= Math.abs(status) || oldStatus >= status) return;
//     console.log("updateContestStandingsRow", id, "contest:", contest, "user:", user, "task:", task, "notOfficial:", notOfficial, oldStatus, status);
//     await db.updateTable("standings").set({status, notOfficial, datetime: new Date()}).where("id", '=', id).execute();
// }
//
// export async function updateContestStandingsUser(contest: number, row: StandingsRow, problems: Array<number>, users: {[key: string]: number}): Promise<void> {
//     let user = users[row.name.toLowerCase()];
//     if (!user) return;
//     let place = await db.selectFrom("usersContests").where(({and, eb}) => and([eb("contest", '=', contest), eb("user", '=', user)])).selectAll().executeTakeFirst();
//     if (!place) {
//         await db.insertInto("usersContests").values({contest, user, place: row.place}).execute();
//     }
//     else {
//         await db.updateTable("usersContests").where("id", '=', place.id).set({place: row.place}).execute();
//     }
//     await Promise.all(problems.map((problem, index) => updateContestStandingsRow(contest, user, problem, row.problems[index][0], row.problems[index][1])));
// }
//
// export async function createContest(groupId: string, standings: Standings): Promise<number> {
//     await db.insertInto("contests").values({groupId, contestId: standings.contestId, name: standings.name}).execute();
//     let contest = await getContestId(groupId, standings.contestId);
//     if (!contest) return 0;
//     await Promise.all(standings.problems.map(title =>
//         db.insertInto("problems").values({contest, title, pdfLink: ""}).execute()
//     ));
//     return contest;
// }
//
// export async function updateContestStandings(groupId: string, standings?: Standings): Promise<void> {
//     if (!standings) return;
//     let contest = await getContestId(groupId, standings.contestId);
//     if (!contest) contest = await createContest(groupId, standings);
//     let problems = await getContestProblems(contest);
//     if (!problems.length) {
//         await Promise.all(standings.problems.map(title =>
//             db.insertInto("problems").values({contest, title, pdfLink: ""}).execute()
//         ));
//         problems = await getContestProblems(contest);
//     }
//     let users = await getCodeforcesHandleUserIdMap();
//     await Promise.all(Object.entries(standings.rows).map(([_, row]) => updateContestStandingsUser(contest, row, problems, users)));
// }
//
// export async function updateGroupStandings(groupId: string, groupStandings: {[key: string]: Standings | undefined}) {
//     // let contestsToRemove = (await db.selectFrom("contests").select(["id"])
//     //     .where(({eb, and, or}) => and([
//     //         eb("groupId", '=', groupId),
//     //         eb("available", '=', true),
//     //         ...Object.keys(groupStandings).map(name => eb("name", '!=', name))
//     //     ]))
//     //     .execute()).map(({id}) => id);
//     // await db.updateTable("contests").set({available: false})
//     //     .where(({or, eb}) =>
//     //         or(contestsToRemove.map(contestId => eb("id", '=', contestId)))
//     //     ).execute();
//     // await db.updateTable("problems").set({available: false})
//     //     .where(({or, eb}) =>
//     //         or(contestsToRemove.map(contestId => eb("contest", '=', contestId)))
//     //     ).execute();
//     // await db.updateTable("standings").set({available: false})
//     //     .where(({or, eb}) =>
//     //         or(contestsToRemove.map(contestId => eb("contest", '=', contestId)))
//     //     ).execute();
//     await fs.writeFile(`./${new Date()}.json`, JSON.stringify(Object.fromEntries(Object.entries(groupStandings).map(([key, standings]) => [key, standings?.object]))), {encoding: "utf8"});
//     await Promise.all(Object.values(groupStandings).map(standings => updateContestStandings(groupId, standings)));
// }
//
// export async function patchContest(id: number, standings: Standings): Promise<boolean> {
//     try {
//         let {contestId} = await db.selectFrom("contests").where("id", '=', id).select(["contestId"]).executeTakeFirstOrThrow();
//         standings.contestId = contestId;
//         await updateContestStandings("jOZ7EYg9HX", standings);
//         return true;
//     }
//     catch {
//         return false;
//     }
// }
//
// export async function addContest(standings: Standings) {
//     await updateContestStandings("jOZ7EYg9HX", standings);
// }