import {db} from "./index.sql.js";

export async function getPermissions(user: number, article: number | string): Promise<{read: boolean, write: boolean}> {
    if (typeof article === "string") {
        article = (await db.selectFrom("articleRepos").where("repo", '=', article).select(["id"]).executeTakeFirstOrThrow()).id;
    }
    return (await db.selectFrom("articlePermissions").where(({eb, and}) =>
        and([eb("article", '=', article), eb("user", '=', user)])).select(["read", "write"]).executeTakeFirst()) ?? {read: false, write: false};
}