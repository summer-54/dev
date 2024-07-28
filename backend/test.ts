import {updateGroupStandings} from "./sql/codeforces.update.sql.js";
import {getGroupStandings} from "./codeforces.js";

(async () => {
    // await fs.writeFile("test.json", JSON.stringify(Object.fromEntries(Object.entries(await getGroupStandings("jOZ7EYg9HX") ?? {}).map(([contest, standings]) => [contest, standings?.object]))));
//     setupGroupStandingsUpdater("jOZ7EYg9HX", (standings) => updateGroupStandings("jOZ7EYg9HX", standings));
    // let standings = JSON.parse(await fs.readFile("test.json", {encoding: "utf8"}));
    await updateGroupStandings("jOZ7EYg9HX", await getGroupStandings("jOZ7EYg9HX"));
})();