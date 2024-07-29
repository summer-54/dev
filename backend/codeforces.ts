import axios from "axios";
import {JSDOM} from "jsdom";

export function parseProblemSolutionsCount(elem: string | number): number {
    return typeof elem === "number" ? elem : elem === "+" ? 1 : isNaN(Number(elem)) ? 0 : Number(elem) > 0 ? Number(elem) + 1 : Number(elem);
}

export class StandingsRow {
    public problems: Array<number>;

    public constructor(public name: string, public total: number, public penalty: number, problems: Array<string | number>, public notOfficial: boolean) {
        this.problems = problems.map(elem => parseProblemSolutionsCount(elem));
    }

    public get object() {
        return {
            name: this.name,
            total: this.total,
            penalty: this.penalty,
            problems: this.problems,
            notOfficial: this.notOfficial
        };
    }

    public get json() {
        return JSON.stringify(this.object);
    }
}

export class Standings {
    public rows: Array<StandingsRow> = [];

    public constructor(public name: string, public contestId: number, public problems: Array<string>) {}

    public get object() {
        return {
            name: this.name,
            contestId: this.contestId,
            problems: this.problems,
            rows: this.rows.map(row => row.object)
        };
    }

    public get json() {
        return JSON.stringify(this.object);
    }

    public addRow(row: StandingsRow): Standings {
        this.rows.push(row);
        return this;
    }
}

export function parseStandingsRow(row: Element): StandingsRow {
    return new StandingsRow(row.children[1].querySelector("a")?.innerHTML ?? "", Number(row.children[2].innerHTML), Number(row.children[3].innerHTML), Array.from(row.children).filter((_, index) => index >= 4).map(elem => elem.children[0].innerHTML), row.children[1].innerHTML.trim().startsWith("*"));
}

export function parseStandings(html: JSDOM | string, contestId: number): Standings {
    let jsdom = typeof html === "string" ? new JSDOM(html) : html;
    let rows = jsdom.window.document.querySelectorAll("table.standings tr");
    let standings = new Standings(
        jsdom.window.document.querySelector("div.contest-name a")?.innerHTML.trim() ?? "", contestId,
        Array.from(rows[0].children).filter((_, index) => index >= 4)
            .map(elem => elem.children[0].attributes.getNamedItem("title")?.value ?? elem.children[0].children[0].innerHTML)
    );
    for (let i = 1; i < rows.length - 1; i++) standings.addRow(parseStandingsRow(rows[i]));
    return standings;
}

export async function getStandings(contestId: number, groupId?: string): Promise<Standings | undefined> {
    try {
        let html = (await axios.get<string>(groupId ? `https://codeforces.com/group/${groupId}/contest/${contestId}/standings?showUnofficial=true` : `https://codeforces.com/contest/${contestId}/standings?showUnofficial=true`)).data;
        return parseStandings(html, contestId);
    } catch (error) {}
}

export function parseGroupContest(row: Element): [string, number] {
    let href = (row.querySelector("a")?.attributes.getNamedItem("href")?.value ?? "").split("/");
    return [row.innerHTML.slice(0, row.innerHTML.indexOf("<br>")).trim(), Number(href[href.length - 1])];
}

export function parseGroupContests(html: JSDOM | string): {[key: string]: number} {
    let jsdom = typeof html === "string" ? new JSDOM(html) : html;
    let rows = jsdom.window.document.querySelectorAll("table:not(.rtable) tr");
    let contests: {[key: string]: number} = {};
    for (let i = 1; i < rows.length - 1; i++) {
        let [contest, id] = parseGroupContest(rows[i].children[0]);
        contests[contest] = id;
    }
    return contests;
}

export async function getGroupContests(groupId: string): Promise<{[key: string]: number}> {
    let html = (await axios.get<string>(`https://codeforces.com/group/${groupId}/contests`)).data;
    return parseGroupContests(html);
}

export async function getGroupStandings(groupId: string): Promise<{[key: string]: Standings | undefined}> {
    return Object.fromEntries(await Promise.all(Object.entries(await getGroupContests(groupId)).map(
        async ([contest, id]) => [contest, await getStandings(id, groupId)]
    )));
}

export function setupGroupStandingsUpdater(groupId: string, callback: (standings: {[key: string]: Standings | undefined}) => void | Promise<void>, ms: number = 60000): void {
    async function func() {
        try {
            let data = callback(await getGroupStandings(groupId));
            if (data instanceof Promise) await data;
            setTimeout(func, ms);
        } catch (error) {
            console.error(error);
            setTimeout(func, ms * 100);
        }
    }

    func();
}