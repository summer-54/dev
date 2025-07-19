import {JSDOM} from "jsdom";
import {commitError, get} from "./codeforcesRequests.js";
import {db} from "./sql/index.sql.js";

// export function parseProblemSolutionsCount(elem: string | number): number {
//     return typeof elem === "number" ? elem : elem === "+" ? 1 : isNaN(Number(elem)) ? 0 : Number(elem) > 0 ? Number(elem) + 1 : Number(elem);
// }
//
// export class StandingsRow {
//     public problems: Array<[number, boolean]>;
//
//     public constructor(public name: string, public place: number, public total: number, public penalty: number, problems: Array<string | number>, notOfficial: boolean) {
//         this.problems = problems.map(elem => [parseProblemSolutionsCount(elem), notOfficial]);
//     }
//
//     public update(problems: Array<string | number>, notOfficial: boolean) {
//         this.problems = this.problems.map(([oldElem, oldNotOfficial], index) => {
//             let newElem = parseProblemSolutionsCount(problems[index]);
//             if (Math.abs(newElem) > Math.abs(oldElem) || newElem > oldElem) return [newElem, notOfficial];
//             return [oldElem, oldNotOfficial];
//         });
//     }
//
//     public get object() {
//         return {
//             name: this.name,
//             total: this.total,
//             penalty: this.penalty,
//             problems: this.problems
//         };
//     }
//
//     public get json() {
//         return JSON.stringify(this.object);
//     }
// }
//
// export class Standings {
//     public rows: {[name: string]: StandingsRow} = {};
//
//     public constructor(public name: string, public contestId: number, public problems: Array<string>) {}
//
//     public get object() {
//         return {
//             name: this.name,
//             contestId: this.contestId,
//             problems: this.problems,
//             rows: Object.fromEntries(Object.entries(this.rows).map(([name, row]) => [name, row.object]))
//         };
//     }
//
//     public get json() {
//         return JSON.stringify(this.object);
//     }
//
//     public addRow(name: string, place: number, total: number, penalty: number, problems: Array<string | number>, notOfficial: boolean): Standings {
//         if (name in this.rows) this.rows[name].update(problems, notOfficial);
//         else this.rows[name] = new StandingsRow(name, place, total, penalty, problems, notOfficial);
//         return this;
//     }
// }
//
// export function parseStandingsRow(row: Element) {
//     // return new StandingsRow(row.children[1].querySelector("a")?.innerHTML ?? "", Number(row.children[2].innerHTML), Number(row.children[3].innerHTML), Array.from(row.children).filter((_, index) => index >= 4).map(elem => elem.children[0].innerHTML), row.children[1].innerHTML.trim().startsWith("*"));
//     return {
//         name: row.children[1].querySelector("a")?.innerHTML ?? "",
//         place: Number(row.children[0].innerHTML),
//         total: Number(row.children[2].innerHTML),
//         penalty: Number(row.children[3].innerHTML),
//         problems: Array.from(row.children).filter((_, index) => index >= 4).map(elem => elem.children[0].innerHTML),
//         notOfficial: row.children[1].innerHTML.trim().startsWith("*")
//     }
// }
//
// export function parseStandings(html: JSDOM | string, contestId: number): Standings {
//     let jsdom = typeof html === "string" ? new JSDOM(html) : html;
//     let rows = jsdom.window.document.querySelectorAll("table.standings tr");
//     let standings = new Standings(
//         jsdom.window.document.querySelector("div.contest-name a")?.innerHTML.trim() ?? "", contestId,
//         Array.from(rows[0].children).filter((_, index) => index >= 4)
//             .map(elem => elem.children[0].attributes.getNamedItem("title")?.value ?? elem.children[0].children[0].innerHTML)
//     );
//     for (let i = 1; i < rows.length - 1; i++) {
//         let {name, place, total, penalty, problems, notOfficial} = parseStandingsRow(rows[i]);
//         standings.addRow(name, place, total, penalty, problems, notOfficial);
//     }
//     return standings;
// }
//
// export async function getStandings(contestId: number, groupId?: string): Promise<Standings | undefined> {
//     try {
//         let html = await get(groupId ? `https://codeforces.com/group/${groupId}/contest/${contestId}/standings/groupmates/true?showUnofficial=true` : `https://codeforces.com/contest/${contestId}/standings?showUnofficial=true`);
//         return parseStandings(html, contestId);
//     } catch (error) {
//         console.error(error);
//         commitError();
//         return getStandings(contestId, groupId);
//     }
// }
//
// export function parseGroupContest(row: Element): [string, number] {
//     let href = (row.querySelector("a")?.attributes.getNamedItem("href")?.value ?? "").split("/");
//     return [row.innerHTML.slice(0, row.innerHTML.indexOf("<br>")).trim(), Number(href[href.length - 1])];
// }
//
// export function parseGroupContests(html: JSDOM | string): {[key: string]: number} {
//     let jsdom = typeof html === "string" ? new JSDOM(html) : html;
//     let rows = jsdom.window.document.querySelectorAll("table:not(.rtable) tr");
//     let contests: {[key: string]: number} = {};
//     for (let i = 1; i < rows.length - 1; i++) {
//         let [contest, id] = parseGroupContest(rows[i].children[0]);
//         contests[contest] = id;
//     }
//     return contests;
// }
//
// export async function getGroupContests(groupId: string): Promise<{[key: string]: number}> {
//     let html = await get(`https://codeforces.com/group/${groupId}/contests`);
//     return parseGroupContests(html);
// }
//
// export async function getGroupStandings(groupId: string): Promise<{[key: string]: Standings | undefined}> {
//     return Object.fromEntries(await Promise.all(Object.entries(await getGroupContests(groupId)).map(
//         async ([contest, id]) => [contest, await getStandings(id, groupId)]
//     )));
// }
//
// export function setupGroupStandingsUpdater(groupId: string, callback: (standings: {[key: string]: Standings | undefined}) => void | Promise<void>, ms: number = 120000): void {
//     async function func() {
//         try {
//             let data = callback(await getGroupStandings(groupId));
//             if (data instanceof Promise) await data;
//             setTimeout(func, ms);
//         } catch (error) {
//             console.error(error);
//             setTimeout(func, ms * 1000);
//         }
//     }
//
//     func();
// }

type ResultType = {participant: {name: string, grade: number}, result: number, unofficialResult: number};

function parseNameString(str: string | undefined): {name: string, grade: number, isUnofficial: boolean} | undefined {
    if (!str) return undefined;
    if (str.indexOf("<sup") != -1) str = str.substring(0, str.indexOf("<sup"));
    let isUnofficial = str.startsWith("*");
    if (isUnofficial) str = str.substring(1);
    let gradeStr = str.substring(str.indexOf(",") + 2).trim();
    return {
        name: str.substring(0, str.indexOf(",")),
        grade: Number(gradeStr.substring(0, 2).trim()),
        isUnofficial
    }
}

function parseResult(elem: Element | undefined): number | undefined {
    if (!elem) return undefined;
    if (elem.children.length > 0) return Number(elem.children[0].innerHTML.trim());
    return Number(elem.innerHTML.trim());
}

async function getResults(link: string): Promise<Array<ResultType>> {
    let map = new Map<string, {participant: {name: string, grade: number}, result: number, unofficialResult: number}>;
    (await get(link).then(html => {
        let document = (new JSDOM(html)).window.document;
        return Array.from(document.querySelectorAll("tr").values()).map(tr => ({
            participant: parseNameString(tr.querySelector(".contestant-cell")?.innerHTML.trim()),
            result: parseResult((tr.children ?? [])[2])
        })).filter(({result}) => result);
    })).forEach(({participant, result}) => {
        let data = map.get(participant?.name ?? "") ?? {participant: participant ? {name: participant.name, grade: participant.grade} : {name: "error", grade: 0}, result: 0, unofficialResult: 0};
        if (participant?.isUnofficial) data.unofficialResult = result ?? 0;
        else data.result = result ?? 0;
        map.set(participant?.name ?? "", data);
    });
    return Array.from(map.entries())
        .map(([, data]) => data)
        .filter(({result, unofficialResult}) => result + unofficialResult > 0);

}

async function saveResult(result: ResultType, contestId: number) {
    let official = (await db.selectFrom("officialResults")
        .where(({and, eb}) => and([eb("contestId", '=', contestId), eb("user", '=', result.participant.name)]))
        .select(["id"]).executeTakeFirst());
    if (!official) {
        await db.insertInto("officialResults").values({contestId, user: result.participant.name, result: result.result, datetime: new Date}).execute();
    }
    let history = (await db.selectFrom("unofficialResults")
        .where(({and, eb}) => and([eb("contestId", '=', contestId), eb("user", '=', result.participant.name)]))
        .select(["result"]).execute()).map(({result}) => result);
    if (!history.includes(result.unofficialResult)) {
        await db.insertInto("unofficialResults").values({contestId, user: result.participant.name, result: result.unofficialResult, datetime: new Date}).execute();
    }
}

async function saveResults(results: Array<ResultType>, contestId: number) {
    await Promise.all(results.map(result => saveResult(result, contestId)));
}

export function parseGroupContest(row: Element): [string, number] {
    // console.log(row.outerHTML);
    let href = (row.querySelector("a")?.attributes.getNamedItem("href")?.value ?? "").split("/");
    return [row.innerHTML.slice(0, row.innerHTML.indexOf("<br>")).trim(), Number(href[href.length - 1])];
}

export function parseGroupContests(html: JSDOM | string, dns: string): {[key: string]: [number, string]} {
    let jsdom = typeof html === "string" ? new JSDOM(html) : html;
    let rows = jsdom.window.document.querySelectorAll("table:not(.rtable) tr");
    let contests: {[key: string]: [number, string]} = {};
    for (let i = 1; i < rows.length - 1; i++) {
        let [contest, id] = parseGroupContest(rows[i].children[0]);
        contests[contest] = [id, dns + rows[i].querySelector(".state")?.querySelector("a")?.attributes.getNamedItem("href")?.value];
    }
    return contests;
}

export async function getGroupContests(url: string): Promise<{[key: string]: [number, string]}> {
    let html = await get(url);
    return parseGroupContests(html, `https://${url.split('/')[2]}`);
}

async function saveGroupContest(name: string, contestId: number, link: string): Promise<number> {
    let {id} = (await db.selectFrom("contests").select(["id"]).where("contestId", '=', contestId).executeTakeFirst()) ?? {};
    if (id) return id;
    return (await db.insertInto("contests").values({name, resultsLink: link, contestId}).returning(["id"]).executeTakeFirstOrThrow()).id;
}

async function saveGroupContests(contests: {[key: string]: [number, string]}): Promise<{[key: string]: [number, string]}> {
    return Object.fromEntries(await Promise.all(Object.entries(contests)
        .map(async ([name, [contestId, url]]) => [name, [await saveGroupContest(name, contestId, url), url]])
    ));
}

(async () => {
    console.log(await saveGroupContests(await getGroupContests("https://scp25.contest.codeforces.com/group/37W85IFj7A/contests")));
    // let results = await getResults("https://scp25.contest.codeforces.com/group/37W85IFj7A/contest/613546/standings/groupmates/true");
    // await saveResults(results);
})();

// getGroupStandings("jOZ7EYg9HX").then(console.log);

// async function test() {
//     console.log();
// }
//
// test();
