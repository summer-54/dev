import {BackendiumRouter} from "backendium";
import {object, string} from "checkeasy";
import {getPermissions} from "./sql/articles.sql.js";
import {getUserByToken} from "./sql/users.sql.js";

const router = new BackendiumRouter();

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
        if (typeof request?.body?.headers?.authorization !== "string") {
            response.status(401);
            response.end("");
            return null;
        }
        let {authorization: token} = request.body.headers;
        let user = await getUserByToken(token, ["id"]);
        if (!user) return null;
        return user.id;
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
        if (typeof request?.body?.headers?.authorization !== "string") {
            response.status(401);
            response.end("");
            return null;
        }
        let {authorization: token} = request.body.headers;
        let user = await getUserByToken(token, ["id"]);
        if (!user) return null;
        return user.id;
    }
});

router.post<string, {}, {}, number, {authorization: string}>("/articles/create", async (request, response) => {

}, {
    bodyValidator: (value, key) => {
        return string()(value.toString(), key);
    },
    headersValidator: object({
        authorization: string()
    }, {ignoreUnknown: true}),
    async authChecker(request, response) {
        if (typeof request?.body?.headers?.authorization !== "string") {
            response.status(401);
            response.end("");
            return null;
        }
        let {authorization: token} = request.body.headers;
        let user = await getUserByToken(token, ["id"]);
        if (!user) return null;
        return user.id;
    }
});