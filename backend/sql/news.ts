import {db} from "./index.js";

export async function getNews({limit, offset}: {limit: number, offset: number}) {
    let select = db.selectFrom("news").select(["id", "title", "img", "description", "datetime"]).orderBy("datetime", "desc");
    if (limit) select = select.limit(Number(limit));
    if (offset) select = select.offset(Number(offset));
    return select.execute();
}

export async function getNew(id: number) {
    let article = {
        ...(await db.selectFrom("news").selectAll().where("id", "=", id).executeTakeFirstOrThrow()),
        images: await db.selectFrom("newsImages").selectAll().where("newId", "=", id).execute()
    }
    return {...article, datetime: new Date(article.datetime)};
}

export async function getLatestNew() {
    let article = await db.selectFrom("news").selectAll().orderBy("datetime", "desc").executeTakeFirstOrThrow();
    return {
        ...article, datetime: new Date(article.datetime),
        images: await db.selectFrom("newsImages").selectAll().where("newId", "=", article.id).execute()
    }
}