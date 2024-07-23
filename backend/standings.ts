import {buildHandlers} from "sbackend";
import {getFullStandings} from "./sql/codeforces.sql.js";

export default buildHandlers({
    get: {
        async "/standings"(_, response) {
            response.end(await getFullStandings());
        },
        async "/codeforces"(_, response) {
            response.end(await getFullStandings());
        }
    }
});