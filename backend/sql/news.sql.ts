import {db} from "./index.sql.js";
import {addAttachment} from "../attachments.js";

export async function getNews({limit, offset}: {limit?: number, offset?: number}) {
    let select = db.selectFrom("news").select(["id", "title", "img", "description", "datetime"]).orderBy("datetime", "desc");
    if (limit && !isNaN(limit)) select = select.limit(limit);
    if (offset && !isNaN(offset)) select = select.offset(offset);
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

export async function postNew({title, description, fullText, images, img, attachments}: {
    title: string,
    description: string,
    fullText: string,
    images?: Array<string>,
    img?: string,
    attachments?: {[key: string]: string}
}) {
    await db.insertInto("news").values({title, description, fullText, img, datetime: new Date()}).execute();
    let article = await getLatestNew();
    let promises: Array<Promise<any>> = [];
    Object.entries(attachments ?? {}).forEach(([key, value]) => {
        promises.push(addAttachment(`./newsAttachments/${article.id}/${key}`, value));
    });
    (images ?? []).forEach((image: string) => {
        promises.push(db.insertInto("newsImages").values({
            newId: article.id,
            image: `%SERVER%/news/${article.id}/${image}`
        }).execute());
    });
    if (img) {
        promises.push(db.updateTable("news").set({img: `%SERVER%/news/${article.id}/${img}`}).where("id", "=", article.id).execute());
    }
    await Promise.all(promises);
    return getNew(article.id);
}

export async function patchNew(id: number, {title, description, fullText, images, img, attachments}: {
    title?: string,
    description?: string,
    fullText?: string,
    images?: Array<string>,
    img?: string,
    attachments?: {[key: string]: string}
}) {
    let promises: Array<Promise<any>> = [];
    promises.push(db.updateTable("news").set({title, description, fullText, img: img ? `%SERVER%/news/${id}/${img}` : undefined}).where("id", '=', id).execute());
    Object.entries(attachments ?? {}).forEach(([key, value]) => {
        promises.push(addAttachment(`./newsAttachments/${id}/${key}`, value));
    });
    promises.push((async () => {
        await db.deleteFrom("newsImages").where("newId", '=', id).execute();
        await Promise.all((images ?? []).map((image: string) => {
            return db.insertInto("newsImages").values({
                newId: id,
                image: `%SERVER%/news/${id}/${image}`
            }).execute();
        }));
    })());
    await Promise.all(promises);
    return getNew(id);
}

export async function removeNew(id: number) {
    await db.deleteFrom("newsImages").where("newId", '=', id).execute();
    await db.deleteFrom("news").where("id", '=', id).execute();
}