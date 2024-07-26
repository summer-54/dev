import {getGroupStandings} from "./codeforces.js";
import fs from "node:fs/promises";

(async () => {
    await fs.writeFile("test.json", JSON.stringify(Object.fromEntries(Object.entries(await getGroupStandings("jOZ7EYg9HX") ?? {}).map(([contest, standings]) => [contest, standings?.object]))));
})();