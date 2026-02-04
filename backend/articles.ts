import {BackendiumRouter} from "backendium";
import {object, string} from "parsium";
import {canCreate, create, getPermissions} from "./sql/articles.sql.js";
import {checkAuth, checkAuthRetID} from "./authChecker.js";

const router = new BackendiumRouter();

// router.get<Buffer, {repo: string}, {}, {id: number, username: string}>("/article/:repo/canCreate", (request, response) => {
//     response.end(canCreate(request.params.repo, request.auth.id, request.auth.username));
// }, {
//     paramsValidator: object({
//         repo: string()
//     }, {ignoreUnknown: true}),
//     async authChecker(request, response) {
//         return checkAuth(request?.body?.headers?.authorization, ["id", "username"], response);
//     }
// });

router.get("/:repo/canCreate", {
    paramsValidator: object({
        repo: string()
    }, {ignoreUnknown: true}),
    headersValidator: object({
        authorization: string()
    }, {ignoreUnknown: true}),
    async authChecker(request, response) {
        return checkAuth(request?.headers?.authorization, ["id", "username"], response);
    }
}, async (request, response) => {
    response.end(await canCreate(request.params.repo, request.auth.id, request.auth.username));
});

router.post("/:repo/create", {
    paramsValidator: object({
        repo: string()
    }, {ignoreUnknown: true}),
    headersValidator: object({
        authorization: string()
    }, {ignoreUnknown: true}),
    async authChecker(request, response) {
        return checkAuth(request?.headers?.authorization, ["id", "username"], response);
    }
}, async (request, response) => {
    if (!(await canCreate(request.params.repo, request.auth.id, request.auth.username))) {
        response.status(409);
        response.end();
        return;
    }
    await create(request.params.repo, request.auth.id);
    response.status(201);
    response.end();
});

router.post<{headers: {authorization: string}, repo: string}, {}, {}, number>("/push-check", {
    bodyValidator: object({
        headers: object({authorization: string()}, {ignoreUnknown: true}),
        repo: string()
    }, {ignoreUnknown: true}),
    async authChecker(request, response) {
        return checkAuthRetID(JSON.parse(request.body.toString())?.headers?.authorization, response);
    }
}, async (request, response) => {
    const permissions = await getPermissions(request.auth, request.body.repo.toLowerCase());
    if (!permissions.write) {
        response.status(404);
        response.end();
        return;
    }
    response.end(request.body.repo.toLowerCase());
});

router.post<{headers: {authorization: string}, repo: string}, {}, {}, number>("/pull-check", {
    bodyValidator: object({
        headers: object({authorization: string()}, {ignoreUnknown: true}),
        repo: string()
    }, {ignoreUnknown: true}),
    async authChecker(request, response) {
        return checkAuthRetID(JSON.parse(request.body.toString())?.headers?.authorization, response);
    }
}, async (request, response) => {
    const permissions = await getPermissions(request.auth, request.body.repo.toLowerCase());
    if (!permissions.read) {
        response.status(404);
        response.end();
        return;
    }
    response.end(request.body.repo.toLowerCase());
});

export default router;