import SBackend from "sbackend";
import "dotenv/config";
import {setupEnv} from "./sql/index.js";
import news from "./news.js";
import users from "./users.js";

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
    app.addHandlers(users);

    app.get("/teapot", (request, response) => {
        response.status(418);
        response.end("This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol, and is not expected to be implemented by actual HTTP servers. However, known implementations do exist.");
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