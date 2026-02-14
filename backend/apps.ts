import {BackendiumRouter} from "backendium";
import {object, uuid} from "parsium";
import {checkAuthRetData, checkAuthRetID} from "./authChecker.js";
import {generateRefreshToken, verifyAppToken} from "./jwt.js";

const router = new BackendiumRouter();

// router.post("/", {
//     bodyValidator: object({
//         id: string(),
//         imgUrl: string(),
//         displayName: string(),
//         description: string()
//     }),
//     async authChecker(request, response) {
//         return checkAuth(request?.headers?.authorization, ["id"], response);
//     }
// }, async (request, response) => {
//     if (!(await getBooleanPermission(request.auth.id, "apps/create"))) {
//         response.status(403);
//         response.end();
//         return;
//     }
//
//     if (await isAppIdUsed(request.body.id)) {
//         response.status(409);
//         response.end();
//         return;
//     }
//
//     await db.insertInto("apps")
//         .values({...request.body, owner: request.auth.id})
//         .execute();
//
//     await db.insertInto("permissions")
//         .values({
//             permission: `apps/maintainers/${request.body.id}`,
//             reference: "apps/maintainers/$",
//             user: request.auth.id,
//             value: true
//         })
//         .execute();
//
//     response.status(201);
//     response.end();
// });
//
// router.put("/:app/exposed-permissions")

let oauthSessions: Record<string, {app: string, status: boolean | null, user: number, jti: number}> = {};

function findFreeUUID() {
    let id;
    do {
        id = Bun.randomUUIDv7();
    } while (id in oauthSessions);
    return id;
}

router.post("/oauth/start", {
    async authChecker(request, response) {
        if (!("authorization" in request.headers)) {
            return null;
        }
        const data = await verifyAppToken(request.headers.authorization);
        if (data === false) {
            return null;
        }
        return data.app;
    },
    authFailed(_, response) {
        response.status(401);
        response.end();
    }
}, async (request, response) => {
    let sessionUUID = findFreeUUID();
    oauthSessions[sessionUUID] = {app: request.auth, status: null, user: 0, jti: 0};
    response.end(sessionUUID);
});

router.get("/oauth/status/:uuid", {
    paramsValidator: object({
        uuid: uuid()
    }),
    async authChecker(request, response) {
        if (!("authorization" in request.headers)) {
            return null;
        }
        const data = await verifyAppToken(request.headers.authorization);
        if (data === false) {
            return null;
        }
        return data.app;
    },
    authFailed(_, response) {
        response.status(401);
        response.end();
    }
}, async (request, response) => {
    if (!(request.params.uuid in oauthSessions)) {
        response.status(404);
        response.end();
        return;
    }
    if (oauthSessions[request.params.uuid].app !== request.auth) {
        response.status(403);
        response.end();
        return;
    }
    let status = oauthSessions[request.params.uuid].status;
    response.end({status, token: status ? await generateRefreshToken(oauthSessions[request.params.uuid].user, oauthSessions[request.params.uuid].jti, request.auth) : ""});
    if (status !== null) delete oauthSessions[request.params.uuid];
});

router.post("/oauth/approve/:uuid", {
    paramsValidator: object({
        uuid: uuid()
    }),
    async authChecker(request, response) {
        return checkAuthRetData(request.headers?.authorization, response);
    }
}, async (request, response) => {
    if (!(request.params.uuid in oauthSessions)) {
        response.status(404);
        response.end();
        return;
    }
    if (oauthSessions[request.params.uuid].status !== null) {
        response.status(409);
        response.end();
        return;
    }
    oauthSessions[request.params.uuid].status = true;
    oauthSessions[request.params.uuid].user = request.auth.id;
    oauthSessions[request.params.uuid].jti = request.auth.jti;
    response.end();
});

router.post("/oauth/cancel/:uuid", {
    paramsValidator: object({
        uuid: uuid()
    }),
    async authChecker(request, response) {
        return checkAuthRetID(request.headers?.authorization, response);
    }
}, async (request, response) => {
    if (!(request.params.uuid in oauthSessions)) {
        response.status(404);
        response.end();
        return;
    }
    if (oauthSessions[request.params.uuid].status !== null) {
        response.status(409);
        response.end();
        return;
    }
    oauthSessions[request.params.uuid].status = false;
    response.end();
});

export default router;