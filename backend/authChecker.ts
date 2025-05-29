import {SelectExpression} from "kysely";
import {Database} from "./sql/index.sql.js";
import {getUserByToken} from "./sql/users.sql.js";
import type BackendiumResponse from "backendium/dist/response.js";

export async function checkAuth(token: any, select: Array<SelectExpression<Database, "users">>, response: BackendiumResponse) {
    if (typeof token !== "string") {
        response.status(401);
        response.end("");
        return null;
    }
    let user = await getUserByToken(token, select);
    if (!user) return null;
    return user;
}

export async function checkAuthRetID(token: any, response: BackendiumResponse) {
    return (await checkAuth(token, ["id"], response))?.id ?? null;
}