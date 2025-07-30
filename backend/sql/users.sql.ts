import randomstring from "randomstring";
import {Database, db} from "./index.sql.js";
import {compareHash, hash} from "scryptex";
import {SelectExpression} from "kysely";
import {UpdateObjectExpression} from "kysely/dist/cjs/parser/update-set-parser.js";

export async function register({username, codeforcesHandle, firstName, lastName, email, password}: {username: string, codeforcesHandle: string, firstName: string, lastName: string, email: string, password: string}) {
    let passwordHash = hash(password);
    await db.insertInto("users").values({
        username,
        codeforcesHandle,
        codeforcesHandleLowerCase: codeforcesHandle.toLowerCase(),
        firstName,
        lastName,
        email: email.toLowerCase(),
        passwordHash,
        isAdmin: false
    }).executeTakeFirstOrThrow();
    return signIn(username, password, passwordHash);
}

async function isUniqueToken(token: string) {
    let result = await db.selectFrom("sessions").where("token", '=', token).select("id").executeTakeFirst();
    return !Boolean(result);
}

export function generateRandomString() {
    return randomstring.generate({length: 512, charset: ["alphanumeric", '@', '#', '$', '%', '^', '&', '*', ':', ';']});
}

export async function generateToken() {
    return `${generateRandomString()}.${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDate()}.${new Date().getHours()}.${new Date().getMinutes()}.${new Date().getSeconds()}.${new Date().getMilliseconds()}`;
}

export async function signIn(username: string, password: string, passwordHash?: string): Promise<string | null> {
    let passHash: string = "";
    if (passwordHash) passHash = passwordHash;
    else {
        let {passwordHash} = await db.selectFrom("users").select("passwordHash").where("username", '=', username).executeTakeFirstOrThrow();
        passHash = passwordHash;
    }
    if (!compareHash(password, passHash)) return null;
    let token = await generateToken();
    let {id} = await db.selectFrom("users").select("id").where("username", '=', username).executeTakeFirstOrThrow();
    await db.insertInto("sessions").values({userId: id, token}).executeTakeFirstOrThrow();
    return token;
}

export async function signInById(id: number): Promise<string | null> {
    let token = await generateToken();
    // let {id} = await db.selectFrom("users").select("id").where("username", '=', username).executeTakeFirstOrThrow();
    await db.insertInto("sessions").values({userId: id, token}).executeTakeFirstOrThrow();
    return token;
}

export async function isUniqueUsername(username: string): Promise<boolean> {
    return !Boolean(await db.selectFrom("users").where("username", '=', username).select("id").executeTakeFirst());
}

export async function isUniqueCodeforcesHandle(codeforcesHandle: string): Promise<boolean> {
    return !Boolean(await db.selectFrom("users").where("codeforcesHandleLowerCase", '=', codeforcesHandle.toLowerCase()).select("id").executeTakeFirst());
}

export async function isUniqueEmail(email: string): Promise<boolean> {
    return !Boolean(await db.selectFrom("users").where("email", '=', email.toLowerCase()).select("id").executeTakeFirst());
}

export async function getUserByUsername(username: string, select: Array<SelectExpression<Database, "users">> = ["username", "codeforcesHandle", "firstName", "lastName", "isAdmin"]) {
    return db.selectFrom("users").where("username", '=', String(username)).select(select).executeTakeFirst();
}

export async function getUserIdByToken(token: string): Promise<number | null> {
    let sessions = await db.selectFrom("sessions").where("token", '=', token).select("userId").execute();
    if (!sessions.length) return null;
    return sessions[0].userId;
}

export async function getUserByToken(token: string, select: Array<SelectExpression<Database, "users">> = ["id", "username", "codeforcesHandle", "firstName", "lastName", "isAdmin"]) {
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

export async function signOut(token: string) {
    await db.deleteFrom("sessions").where("token", '=', token).execute();
}

export async function getCodeforcesHandleUserIdMap(): Promise<{[key: string]: number}> {
    return Object.fromEntries((await db.selectFrom("users").select(["id", "codeforcesHandleLowerCase"]).execute()).map(({id, codeforcesHandleLowerCase}) => [codeforcesHandleLowerCase, id]));
}

export async function getUserById(id: number, select: Array<SelectExpression<Database, "users">> = ["id"]) {
    return db.selectFrom("users").where("id", '=', id).select(select).executeTakeFirst();
}

export async function getUsernameById(id: number): Promise<string | undefined> {
    return (await getUserById(id, ["username"]))?.username;
}

export async function getIdByEmail(email: string): Promise<number | undefined> {
    return (await db.selectFrom("users").where("email", '=', email.toLowerCase()).select(["id"]).executeTakeFirst())?.id;
}

export async function getUserIdByUsername(username: string): Promise<number | undefined> {
    return (await getUserByUsername(username, ["id"]))?.id;
}

export async function getAllUsers(select: Array<SelectExpression<Database, "users">> = ["username"]) {
    return db.selectFrom("users").select(select).execute();
}

export async function adminUsersPatch(data: Array<{id: number, codeforcesHandle?: string}>) {
    await Promise.all(data.map(async ({id, codeforcesHandle}) => {
        if (codeforcesHandle) await db.updateTable("users").where("id", '=', id).set({codeforcesHandle, codeforcesHandleLowerCase: codeforcesHandle.toLowerCase()}).execute();
    }));
}

export async function isAdmin(token: string): Promise<boolean> {
    let userId = await db.selectFrom("sessions").where("token", '=', token).select(["userId"]).executeTakeFirst();
    if (!userId) return false;
    let isAdmin = await db.selectFrom("users").where("id", '=', userId.userId).select(["isAdmin"]).executeTakeFirstOrThrow();
    return isAdmin.isAdmin;
}

export async function makeAdmin(id: number) {
    await db.updateTable("users").where("id", '=', id).set({isAdmin: true}).execute();
}