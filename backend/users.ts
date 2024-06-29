import {buildHandlers} from "sbackend";
import {compareHash, hash} from "scryptex";
import {Database, db, UsersTable} from "./sql/index.js";
import randomstring from "randomstring";
import {SelectExpression} from "kysely";
import {UpdateObjectExpression} from "kysely/dist/cjs/parser/update-set-parser.js";

export function generateToken() {
    return randomstring.generate({length: 512, charset: ["alphanumeric", '@', '#', '$', '%', '^', '&', '*', ':', ';']});
}

export async function signIn(username: string, password: string, passwordHash?: string): Promise<string | null> {
    let passHash: string = "";
    if (passwordHash) passHash = passwordHash;
    else {
        let {passwordHash} = await db.selectFrom("users").select("passwordHash").where("username", '=', username).executeTakeFirstOrThrow();
        passHash = passwordHash;
    }
    if (!compareHash(password, passHash)) return null;
    let token = generateToken();
    let {id} = await db.selectFrom("users").select("id").where("username", '=', username).executeTakeFirstOrThrow();
    await db.insertInto("sessions").values({userId: id, token}).executeTakeFirstOrThrow();
    return token;
}

export async function getUserIdByToken(token: string): Promise<number | null> {
    let sessions = await db.selectFrom("sessions").where("token", '=', token).select("userId").execute();
    if (!sessions.length) return null;
    return sessions[0].userId;
}

export async function getUserByToken(token: string, select: Array<SelectExpression<Database, "users">> = ["id", "username", "codeforcesHandle", "firstName", "lastName"]) {
    let id = await getUserIdByToken(token);
    if (!id) return null;
    return db.selectFrom("users").where("id", '=', id).select(select).executeTakeFirstOrThrow();
}

export async function patchUser(id: number, patch: UpdateObjectExpression<Database, "users", "users">) {
    await db.updateTable("users").set(patch).where("id", '=', id).executeTakeFirstOrThrow();
}

export default buildHandlers({
    post: {
        async "/users/register"(request, response) {
            if (typeof request.body !== "object") {
                response.status(400);
                response.end("");
                return;
            }
            if (typeof request.body.username !== "string" || typeof request.body.codeforcesHandle !== "string" ||
                typeof request.body.firstName !== "string" || typeof request.body.lastName !== "string" ||
                typeof request.body.password !== "string") {
                response.status(400);
                response.end("");
                return;
            }
            let {username, codeforcesHandle, firstName, lastName, password} = request.body;
            let passwordHash = hash(password);
            await db.insertInto("users").values({username, codeforcesHandle, firstName, lastName, passwordHash}).executeTakeFirstOrThrow();
            response.status(201);
            let token = await signIn(username, password, passwordHash);
            if (!token) {
                response.status(500);
                response.end("");
                return;
            }
            response.end(token);
        },
        async "/users/signin"(request, response) {
            if (typeof request.body !== "object") {
                response.status(400);
                response.end("");
                return;
            }
            if (typeof request.body.username !== "string" || typeof request.body.password !== "string") {
                response.status(400);
                response.end("");
                return;
            }
            let {username, password} = request.body;
            let token = await signIn(username, password);
            if (!token) {
                response.status(401);
                response.end("");
                return;
            }
            response.end(token);
        },
        async "/users/is-unique/username"(request, response) {
            if (typeof request.body !== "string") {
                response.status(400);
                response.end("");
                return;
            }
            let user = await db.selectFrom("users").where("username", '=', request.body).select("id").executeTakeFirst();
            if (user) response.end("0");
            else response.end("1");
        },
        async "/users/is-unique/codeforces-handle"(request, response) {
            if (typeof request.body !== "string") {
                response.status(400);
                response.end("");
                return;
            }
            let user = await db.selectFrom("users").where("codeforcesHandle", '=', request.body).select("id").executeTakeFirst();
            if (user) response.end("0");
            else response.end("1");
        }
    },
    get: {
        async "/me"(request, response) {
            if (typeof request.headers.authorization !== "string") {
                response.status(401);
                response.end("");
                return;
            }
            let {authorization: token} = request.headers;
            let user = await getUserByToken(token);
            if (!user) {
                response.status(401);
                response.end("");
                return;
            }
            response.end(user);
        },
        async "/users/:username"(request, response) {
            let user = await db.selectFrom("users").where("username", '=', String(request.params.username)).select(["username", "codeforcesHandle", "firstName", "lastName"]).executeTakeFirst();
            if (!user) {
                response.status(404);
                response.end("");
                return;
            }
            response.end(user);
        }
    },
    patch: {
        async "/me"(request, response) {
            if (typeof request.body !== "object") {
                response.status(400);
                response.end("");
                return;
            }
            if (typeof request.headers.authorization !== "string") {
                response.status(401);
                response.end("");
                return;
            }
            let {authorization: token} = request.headers;
            let id = await getUserIdByToken(token);
            if (!id) {
                response.status(401);
                response.end("");
                return;
            }
            let promises: Array<Promise<any>> = [];
            if (typeof request.body.username === "string") {
                promises.push(patchUser(id, {username: request.body.username}));
            }
            if (typeof request.body.codeforcesHandle === "string") {
                promises.push(patchUser(id, {codeforcesHandle: request.body.codeforcesHandle}));
            }
            if (typeof request.body.firstName === "string") {
                promises.push(patchUser(id, {firstName: request.body.firstName}));
            }
            if (typeof request.body.lastName === "string") {
                promises.push(patchUser(id, {lastName: request.body.lastName}));
            }
            await Promise.all(promises);
            response.end("");
        },
        async "/me/password"(request, response) {
            if (typeof request.body !== "object") {
                response.status(400);
                response.end("");
                return;
            }
            if (typeof request.body.old !== "string" || typeof request.body["new"] !== "string") {
                response.status(400);
                response.end("");
                return;
            }
            let {old: oldPassword, new: newPassword} = request.body;
            if (typeof request.headers.authorization !== "string") {
                response.status(401);
                response.end("");
                return;
            }
            let {authorization: token} = request.headers;
            let user = await getUserByToken(token, ["passwordHash", "id"]);
            if (!user) {
                response.status(401);
                response.end("");
                return;
            }
            let {id, passwordHash} = user;
            if (!compareHash(oldPassword, passwordHash)) {
                response.status(418);
                response.end("");
                return;
            }
            await db.updateTable("users").set({passwordHash: hash(newPassword)}).where("id", '=', id).executeTakeFirstOrThrow();
            response.end("");
        }
    }
});