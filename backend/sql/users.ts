import randomstring from "randomstring";
import {Database, db} from "./index.js";
import {compareHash, hash} from "scryptex";
import {SelectExpression} from "kysely";
import {UpdateObjectExpression} from "kysely/dist/cjs/parser/update-set-parser.js";

export async function register({username, codeforcesHandle, firstName, lastName, password}: {username: string, codeforcesHandle: string, firstName: string, lastName: string, password: string}) {
    let passwordHash = hash(password);
    await db.insertInto("users").values({
        username,
        codeforcesHandle,
        firstName,
        lastName,
        passwordHash
    }).executeTakeFirstOrThrow();
    return signIn(username, password, passwordHash);
}

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

export async function isUniqueUsername(username: string): Promise<boolean> {
    return Boolean(db.selectFrom("users").where("username", '=', username).select("id").executeTakeFirst());
}

export async function isUniqueCodeforcesHandle(codeforcesHandle: string): Promise<boolean> {
    return Boolean(db.selectFrom("users").where("username", '=', codeforcesHandle).select("id").executeTakeFirst());
}

export async function getUserByUsername(username: string, select: Array<SelectExpression<Database, "users">> = ["username", "codeforcesHandle", "firstName", "lastName"]) {
    return db.selectFrom("users").where("username", '=', String(username)).select(select).executeTakeFirst();
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

export async function patchUserPassword(id: number, password: string) {
    await db.updateTable("users").set({passwordHash: hash(password)}).where("id", '=', id).executeTakeFirstOrThrow();
}