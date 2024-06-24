import { buildHandlers } from "sbackend";
import {db} from "./sql/index.js";
import * as fs from "node:fs";

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
            try {
                response.status(200);
                response.end(await db.selectFrom("news").selectAll().where("id", "=", Number(request.params.id)).executeTakeFirstOrThrow());
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
            if (typeof body.img !== "string" && typeof body.img !== "undefined") return response.status(400);
            let {title, description, fullText, img} = body;
            await db.insertInto("news").values({title, description, fullText, img, datetime: new Date()}).execute();
            response.status(200);
            response.end();
        }
    }
});