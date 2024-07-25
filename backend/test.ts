import {getStandings} from "./codeforces.js";
import fs from "node:fs/promises";

(async () => {
    await fs.writeFile("test.json", (await getStandings(536186, "jOZ7EYg9HX"))?.json ?? "")
})();