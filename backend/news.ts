import {buildHandlers} from "sbackend";
import {db} from "./sql/index.js";
import * as fs from "node:fs";
import {getLatestNew, getNew} from "./sql/news.js";

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
            if (typeof request.body !== "object") return response.status(400);
            let body: {[key: string]: any} = request.body;
            if (typeof body.title !== "string" || typeof body.description !== "string" || typeof body.fullText !== "string") return response.status(400);
            if (typeof body.img !== "string" && typeof body.img !== "undefined" || typeof body.images !== "object") return response.status(400);
            let {title, description, fullText, img} = body;
            await db.insertInto("news").values({title, description, fullText, img, datetime: new Date()}).execute();
            let article = await getLatestNew();
            let promises: Array<Promise<any>> = [];
            Object.entries(body.images ?? {}).forEach(([key, value]) => {
                if (typeof value === "string") {
                    let Path = `./newsAttachments/${article.id}/${key}`;
                    try {
                        fs.mkdirSync(Path.split('/').filter((_, index, arr) => index < arr.length - 1).join('/'));
                    } catch (e) {}
                    fs.writeFileSync(Path, value, {encoding: "utf8"});
                    promises.push(db.insertInto("newsImages").values({newId: article.id, image: `%SERVER%/news/${article.id}/${key}`}).execute());
                }
            });
            await Promise.all(promises);
            if (img) {
                if (typeof body.imgFormat !== "string") return response.status(400);
                let {imgFormat} = body;
                let Path = `./newsAttachments/${article.id}/icon.${imgFormat}`;
                try {
                    fs.mkdirSync(Path.split('/').filter((_, index, arr) => index < arr.length - 1).join('/'));
                } catch (e) {}
                fs.writeFileSync(Path, img, {encoding: "utf8"});
                img = `%SERVER%/news/${article.id}/icon.${imgFormat}`;
            }
            response.status(200);
            response.end(await getNew(article.id));
        }
    }
});