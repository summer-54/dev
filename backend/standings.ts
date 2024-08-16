import {buildHandlers} from "sbackend";
import {
    getAllContests,
    getContest,
    getFullStandings,
    getHardTasks,
    getUserResults,
    getUserStatistics, patchContests
} from "./sql/codeforces.sql.js";
import {getUserIdByUsername} from "./sql/users.sql.js";
import fs from "node:fs";

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
        },
        async "/results/:user"(request, response) {
            response.end(await getUserResults(Number(request.params.user)));
        },
        async "/problems/:contest"(request, response) {
            if (!fs.existsSync(`./newsAttachments/${request.params.contest}`)) {
                response.status(404);
                response.end();
            } else {
                response.status(200);
                response.end(fs.readFileSync(`./newsAttachments/${request.params.contest}`));
            }
        }
    },
    patch: {
        async "/contests"(request, response) {
            if (typeof request.body !== "object" || !Array.isArray(request.body)) {
                response.status(400);
                response.end();
                return;
            }
            await patchContests(request.body);
            response.end();
        }
    }
});