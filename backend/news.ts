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
    }
});