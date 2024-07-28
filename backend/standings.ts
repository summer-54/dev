import {buildHandlers} from "sbackend";
import {getAllContests, getContest, getFullStandings, getHardTasks, getUserStatistics} from "./sql/codeforces.sql.js";
import {getUserIdByUsername} from "./sql/users.sql.js";

export default buildHandlers({
    get: {
        async "/standings"(_, response) {
            response.end(await getFullStandings());
        },
        async "/contests"(_, response) {
            response.end(await getAllContests());
        },
        async "/contests/:id"(request, response) {
            let contest = await getContest(Number(request.params.id))
            if (contest) return response.end(contest);
            response.status(404);
            response.end();
        },
        async "/statistics/:username"(request, response) {
            let id = await getUserIdByUsername(String(request.params.username ?? ""));
            if (!id) {
                response.status(404);
                response.end();
                return;
            }
            response.end(await getUserStatistics(id));
        },
        async "/hard/:contest"(request, response) {
            response.end(await getHardTasks(Number(request.params.contest)));
        }
    }
});