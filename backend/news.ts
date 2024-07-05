import {buildHandlers} from "sbackend";
import * as fs from "node:fs";
import {getNew, getNews, postNew} from "./sql/news.js";

export default buildHandlers({
    get: {
        async "/news"(request, response) {
            response.status(200);
            response.end(await getNews({limit: Number(request.query.limit), offset: Number(request.query.offset)}));
        },
        async "/news/:id"(request, response) {
            let id = Number(request.params.id);
            try {
                response.status(200);
                response.end(await getNew(id));
            } catch (error) {
                response.status(404);
                response.end();
            }
        },
        async "/news/:id/*"(request, response) {
            let Path = "./" + request.url?.substring("/news/".length)
            if (!fs.existsSync(`./newsAttachments/${Path}`)) {
                response.status(404);
                response.end();
            } else {
                response.status(200);
                response.end(fs.readFileSync(`./newsAttachments/${Path}`));
            }
        }
    },
    post: {
        async "/news"(request, response) {
            if (typeof request.body !== "object") {
                response.status(400);
                response.end("400: request.body isn't object");
                return;
            }
            let body: {[key: string]: any} = request.body;
            if (typeof body.title !== "string" || typeof body.description !== "string" || typeof body.fullText !== "string") {
                response.status(400);
                response.end("400: title, description ot fullText are not strings");
                return;
            }
            if ((typeof body.img !== "string" && typeof body.img !== "undefined") || (typeof body.images !== "object" && typeof body.images !== "undefined")) {
                response.status(400);
                response.end("400: img or images format is wrong");
                return;
            }
            let {title, description, fullText, img} = body;
            response.end(await postNew({
                title,
                description,
                fullText,
                img,
                images: body.imagws,
                attachments: body.attachments
            }));
        }
    }
});