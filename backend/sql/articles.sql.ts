import {db} from "./index.sql.js";

export async function getPermissions(user: number, article: number | string): Promise<{read: boolean, write: boolean, exists: boolean}> {
    if (typeof article === "string") {
        let data = (await db.selectFrom("articleRepos").where("repo", '=', article).select(["id"]).executeTakeFirst())?.id;
        if (!data) return {exists: false, read: false, write: false};
        article = data;
    }
    let data = await db.selectFrom("articlePermissions").where(({eb, and}) =>
        and([eb("article", '=', article), eb("user", '=', user)])).select(["read", "write"]).executeTakeFirst();
    return !data ? {read: false, write: false, exists: true} : {...data, exists: true};
}

export function canCreate(repo: string, id: number, username: string): boolean {
    return repo.startsWith(username + '.') && repo.substring(username.length + 1).match(/[a-zA-Z0-9-_]*/gm)?.length === 2;
}

export async function create(repo: string, user: number) {
    const id = (await db.insertInto("articleRepos").values({repo, user, datetime: new Date()}).returning(["id"]).executeTakeFirst())?.id;
    if (!id) return null;
    await db.insertInto("articlePermissions").values({article: id, user, read: true, write: true}).execute();
    return id;
}