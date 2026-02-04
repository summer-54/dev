import {BackendiumRouter} from "backendium";
import {object, string} from "parsium";
import {checkAuth} from "./authChecker.js";
import {getBooleanPermission} from "./sql/permissions.js";
import {db} from "./sql/index.sql.js";
import {isAppIdUsed} from "./sql/apps.sql.js";

const router = new BackendiumRouter();

router.post("/", {
    bodyValidator: object({
        id: string(),
        imgUrl: string(),
        displayName: string(),
        description: string()
    }),
    async authChecker(request, response) {
        return checkAuth(request?.headers?.authorization, ["id"], response);
    }
}, async (request, response) => {
    if (!(await getBooleanPermission(request.auth.id, "apps/create"))) {
        response.status(403);
        response.end();
        return;
    }

    if (await isAppIdUsed(request.body.id)) {
        response.status(409);
        response.end();
        return;
    }

    await db.insertInto("apps")
        .values({...request.body, owner: request.auth.id})
        .execute();

    response.status(201);
    response.end();
});

export default router;