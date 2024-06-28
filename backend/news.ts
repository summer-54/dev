import {buildHandlers} from "sbackend";
import {db} from "./sql/index.js";
import * as fs from "node:fs";
import {getLatestNew, getNew} from "./sql/news.js";
import {addAttachment} from "./attachments.js";

export default buildHandlers({
    get: {
        async "/news"(request, response) {
            response.status(200);
            let select = db.selectFrom("news").select(["id", "title", "img", "description", "datetime"]).orderBy("datetime", "desc");
            if (request.query.limit) select = select.limit(Number(request.query.limit));
            if (request.query.offset) select = select.offset(Number(request.query.offset));
            response.end(await select.execute());
        },
        async "/news/:id"(request, response) {
            let id = Number(request.params.id);
            try {
                response.status(200);
                response.end(await getNew(id));
            }
            catch (error) {
                response.status(404);
                response.end();
            }
        },
        async "/news/:id/*"(request, response) {
            let Path = "./" + request.url?.substring("/news/".length)
            if (!fs.existsSync(`./newsAttachments/${Path}`)) {
                response.status(404);
                response.end();
            }
            else {
                response.status(200);
                response.end(fs.readFileSync(`./newsAttachments/${Path}`));
            }
        }
    },
    post: {
        async "/news"(request, response) {
            if (typeof request.body !== "object") { response.status(400); response.end("400: request.body isn't object"); return; }
            let body: {[key: string]: any} = request.body;
            if (typeof body.title !== "string" || typeof body.description !== "string" || typeof body.fullText !== "string") { response.status(400); response.end("400: title, description ot fullText are not strings"); return; }
            if ((typeof body.img !== "string" && typeof body.img !== "undefined") || (typeof body.images !== "object" && typeof body.images !== "undefined")) { response.status(400); response.end("400: img or images format is wrong"); return; }
            let {title, description, fullText, img} = body;
            await db.insertInto("news").values({title, description, fullText, img, datetime: new Date()}).execute();
            let article = await getLatestNew();
            let promises: Array<Promise<any>> = [];
            Object.entries(body.attachments ?? {}).forEach(([key, value]) => {
                if (typeof value === "string") {
                    promises.push(addAttachment(`./newsAttachments/${article.id}/${key}`, value));
                    promises.push(db.insertInto("newsImages").values({newId: article.id, image: `%SERVER%/news/${article.id}/${key}`}).execute());
                }
            });
            (body.images ?? []).forEach((image: string) => {
                promises.push(db.insertInto("newsImages").values({newId: article.id, image: `%SERVER%/news/${article.id}/${image}`}).execute());
            });
            if (img) {
                promises.push(db.updateTable("news").set({img: `%SERVER%/news/${article.id}/${img}`}).where("id", "=", article.id).execute());
            }
            await Promise.all(promises);
            response.status(200);
            response.end(await getNew(article.id));
        }
    }
});