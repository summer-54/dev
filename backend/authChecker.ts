import {SelectExpression} from "kysely";
import {Database} from "./sql/index.sql.js";
import {getUserByToken, getUserIdByToken} from "./sql/users.sql.js";
import type BackendiumResponse from "backendium/dist/response.js";
import {verifyAccessToken} from "./jwt.js";

export async function checkAuth(token: any, select: Array<SelectExpression<Database, "users">>, response: BackendiumResponse) {
    if (typeof token !== "string") {
        response.status(401);
        response.end("");
        return null;
    }
    let user = await getUserByToken(token, select);
    if (!user) {
        response.status(401);
        response.end("");
        return null;
    }
    return user;
}

export async function checkAuthRetID(token: any, response: BackendiumResponse) {
    if (typeof token !== "string") {
        response.status(401);
        response.end("");
        return null;
    }
    let user = await getUserIdByToken(token);
    if (!user) {
        response.status(401);
        response.end("");
        return null;
    }
    return user;
}

export async function checkAuthRetData(token: any, response: BackendiumResponse) {
    if (typeof token !== "string") {
        response.status(401);
        response.end("");
        return null;
    }
    let data = await verifyAccessToken(token);
    if (data === false) {
        response.status(401);
        response.end("");
        return null;
    }
    return data;
}