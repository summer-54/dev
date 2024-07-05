import axios from "axios";
import {JSDOM} from "jsdom";
import * as fs from "node:fs";

class StandingRow {
    public constructor(public name: string, public total: number, public penalty: number, public tasks: Array<Element>) {}

    public get object() {
        return {
            name: this.name,
            total: this.total,
            penalty: this.penalty,
            tasks: this.tasks.map(elem => elem.innerHTML.trim())
        };
    }

    public get json() {
        return JSON.stringify(this.object);
    }
}

class Standings {
    public rows: Array<StandingRow> = [];

    public constructor(public name: string, public tasks: Array<Element>) {}

    public get object() {
        return {
            name: this.name,
            tasks: this.tasks.map(elem => elem.innerHTML.trim()),
            rows: this.rows.map(row => row.object)
        };
    }

    public get json() {
        return JSON.stringify(this.object);
    }

    public addRow(name: string, total: number, penalty: number, tasks: Array<Element>): StandingRow {
        let row = new StandingRow(name, total, penalty, tasks);
        this.rows.push(row);
        return row;
    }
}

export async function standings(contestId: number, groupId?: string): Promise<Standings> {
    let html = (await axios.get<string>(groupId ? `https://codeforces.com/group/${groupId}/contest/${contestId}/standings` : `https://codeforces.com/contest/${contestId}/standings`)).data;
    let jsdom = new JSDOM(html);
    let rows = jsdom.window.document.querySelectorAll("table.standings tr");
    let standings = new Standings("test", Array.from(rows[0].children).filter((_, index) => index >= 4));
    for (let i = 1; i < rows.length - 1; i++) {
        let row = rows[i];
        standings.addRow(row.children[1].innerHTML, Number(row.children[2].innerHTML), Number(row.children[3].innerHTML), Array.from(row.children).filter((_, index) => index >= 4));
    }
    return standings;
}

export async function test(): Promise<any> {
    fs.writeFileSync("test.json", (await standings(528663, "jOZ7EYg9HX")).json, {encoding: "utf8"});
}