import SBackend from "sbackend";
import "dotenv/config";
import {setupEnv} from "./sql/index.js";
import news from "./news.js";
import test from "./test.js";

async function main() {
    await setupEnv();

    const app = new SBackend({
        name: "test",
        version: "0.0.0",
        logPath: "./latest.log",
        host: process.env.HOST,
        port: process.env.PORT
    });

    app.addHandlers(news);
    app.addHandlers(test);

    app.get("/", (request, response) => {
        console.log(request.body); // request body
        console.log(request.headers); // request headers
        console.log(request.query); // query (after '?' in route string)
        response.end("test"); // argument can be string or object
    });

    app.use("*", (request, response) => {
        response.status(404);
        response.end("404 Not Found");
    });

    app.start(async () => {
        console.log(app.routes);
        // await standingsTest();
    });
}

main();