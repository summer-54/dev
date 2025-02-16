import fs from "node:fs/promises";
import axios from "axios";

async function getHeaders(): Promise<{[header: string]: string}> {
    return Object.fromEntries((await fs.readFile("./codeforcesRequests.headers", {encoding: "utf8"})).split('\n')
        .map(str => [str.split(": ")[0], str.split(": ").slice(1).join(": ")]));
}

let requestQueue: Array<[string, (data: string) => void]> = [];

export async function get(url: string): Promise<string> {
    return new Promise(resolve => requestQueue.push([url, resolve]));
}

export function commitError() {
    clearInterval(interval);
    setTimeout(() => {
        interval = setInterval(main, 2000);
    }, 80000);
}

async function main() {
    if (!requestQueue.length) return;
    let [url, resolve] = (requestQueue.shift() ?? []);
    if (!url || !resolve) return;
    try {
        console.log("Sent request to", url);
        let response = await axios.get<string>(url, {headers: await getHeaders()});
        if (response.status >= 200 && response.status < 300) {
            console.log("Got response from", url);
            resolve(response.data);
            return;
        }
    } catch (error) {}
    requestQueue.unshift([url, resolve]);
    commitError();
}

let interval = setInterval(main, 2000);