import axios from "axios";
import {JSDOM} from "jsdom";

class StandingRow {
    public tasks: Array<number | string>;

    public constructor(public name: string, public total: number, public penalty: number, tasks: Array<string | number>, public notOfficial: boolean) {
        this.tasks = tasks.map(elem => typeof elem === "number" ? elem : elem === "+" ? 1 : isNaN(Number(elem)) ? 0 : Number(elem));
    }

    public get object() {
        return {
            name: this.name,
            total: this.total,
            penalty: this.penalty,
            tasks: this.tasks,
            notOfficial: this.notOfficial
        };
    }

    public get json() {
        return JSON.stringify(this.object);
    }
}

class Standings {
    public rows: Array<StandingRow> = [];

    public constructor(public name: string, public tasks: Array<string>) {}

    public get object() {
        return {
            name: this.name,
            tasks: this.tasks,
            rows: this.rows.map(row => row.object)
        };
    }

    public get json() {
        return JSON.stringify(this.object);
    }

    public addRow(row: StandingRow): Standings {
        this.rows.push(row);
        return this;
    }
}

export function parseStandingsRow(row: Element): StandingRow {
    return new StandingRow(row.children[1].querySelector("a")?.innerHTML ?? "", Number(row.children[2].innerHTML), Number(row.children[3].innerHTML), Array.from(row.children).filter((_, index) => index >= 4).map(elem => elem.children[0].innerHTML), row.children[1].innerHTML.trim().startsWith("*"));
}

export function parseStandings(html: JSDOM | string): Standings {
    let jsdom = typeof html === "string" ? new JSDOM(html) : html;
    let rows = jsdom.window.document.querySelectorAll("table.standings tr");
    let standings = new Standings("test", Array.from(rows[0].children).filter((_, index) => index >= 4).map(elem => elem.children[0].attributes.getNamedItem("title")?.value ?? elem.children[0].children[0].innerHTML));
    for (let i = 1; i < rows.length - 1; i++) standings.addRow(parseStandingsRow(rows[i]));
    return standings;
}

export async function getStandings(contestId: number, groupId?: string): Promise<Standings> {
    let html = (await axios.get<string>(groupId ? `https://codeforces.com/group/${groupId}/contest/${contestId}/standings?showUnofficial=true` : `https://codeforces.com/contest/${contestId}/standings?showUnofficial=true`)).data;
    return parseStandings(html);
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

export async function getGroupStandings(groupId: string): Promise<{[key: string]: Standings}> {
    return Object.fromEntries(await Promise.all(Object.entries(await getGroupContests(groupId)).map(
        async ([contest, id]) => [contest, await getStandings(id, groupId)]
    )));
}