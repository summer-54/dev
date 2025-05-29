import {BackendiumRouter} from "backendium";
import {object, string} from "checkeasy";
import {canCreate, create, getPermissions} from "./sql/articles.sql.js";
import {checkAuth, checkAuthRetID} from "./authChecker.js";

const router = new BackendiumRouter();

router.get<Buffer, {repo: string}, {}, {id: number, username: string}>("/article/:repo/canCreate", (request, response) => {
    response.end(canCreate(request.params.repo, request.auth.id, request.auth.username));
}, {
    paramsValidator: object({
        repo: string()
    }, {ignoreUnknown: true}),
    async authChecker(request, response) {
        return checkAuth(request?.body?.headers?.authorization, ["id", "username"], response);
    }
});

router.post<Buffer, {repo: string}, {}, {id: number, username: string}, {authorization: string}>("/articles/create", async (request, response) => {
    if (!canCreate(request.params.repo, request.auth.id, request.auth.username)) {
        response.status(409);
        response.end();
        return;
    }
    await create(request.params.repo, request.auth.id);
    response.status(201);
    response.end();
}, {
    paramsValidator: object({
        repo: string()
    }, {ignoreUnknown: true}),
    headersValidator: object({
        authorization: string()
    }, {ignoreUnknown: true}),
    async authChecker(request, response) {
        return checkAuth(request?.body?.headers?.authorization, ["id", "username"], response);
    }
});

router.post<{headers: {authorization: string}, repo: string}, {}, {}, number>("/articles/push-check", async (request, response) => {
    const permissions = await getPermissions(request.auth, request.body.repo.toLowerCase());
    if (!permissions.write) {
        response.status(404);
        response.end();
        return;
    }
    response.end(request.body.repo.toLowerCase());
}, {
    bodyValidator: object({
        headers: object({authorization: string()}, {ignoreUnknown: true}),
        repo: string()
    }, {ignoreUnknown: true}),
    async authChecker(request, response) {
        return checkAuthRetID(request?.body?.headers?.authorization, response);
    }
});

router.post<{headers: {authorization: string}, repo: string}, {}, {}, number>("/articles/pull-check", async (request, response) => {
    const permissions = await getPermissions(request.auth, request.body.repo.toLowerCase());
    if (!permissions.read) {
        response.status(404);
        response.end();
        return;
    }
    response.end(request.body.repo.toLowerCase());
}, {
    bodyValidator: object({
        headers: object({authorization: string()}, {ignoreUnknown: true}),
        repo: string()
    }, {ignoreUnknown: true}),
    async authChecker(request, response) {
        return checkAuthRetID(request?.body?.headers?.authorization, response);
    }
});