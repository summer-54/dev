import {setupEnv} from "./sql/index.sql.js";
import news from "./news.js";
import users from "./users.js";
import standings from "./standings.js";
import recovery from "./recovery.js";
import articles from "./articles.js";
import Backendium from "backendium";
import cookieParser from "cookie-parser";
import apps from "./apps.js";
// import {setupGroupStandingsUpdater} from "./codeforces.js";
// import {updateGroupStandings} from "./sql/codeforces.update.sql.js";

async function main() {
    await setupEnv();

    // const app = new SBackend({
    //     name: "test",
    //     version: "0.0.0",
    //     logPath: "./latest.log",
    //     host: process.env.HOST,
    //     port: process.env.PORT
    // });

    const app = new Backendium({
        name: "inf54",
        version: "0.0.0",
        host: process.env.HOST,
        port: Number(process.env.PORT ?? 8080)
    });

    app.express.use("*", (request, response, next) => {
        response.set({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
            "Access-Control-Allow-Headers": "*"
        });
        next();
    });
    app.express.use(cookieParser());

    app.router(news);
    app.router(users);
    app.router(standings);
    app.router(recovery);
    app.router(articles, "/articles");
    app.router(apps, "/apps")

    app.get("/teapot", {}, (request, response) => {
        response.status(418);
        response.end("This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol, and is not expected to be implemented by actual HTTP servers. However, known implementations do exist.");
    });

    app.options("*", {}, (request, response) => {
        response.end();
    });

    app.use("*", {}, (request, response) => {
        response.status(404);
        response.end("404 Not Found");
    });

    app.start(async () => {
        // console.log(app.routes);
        // setupGroupStandingsUpdater("jOZ7EYg9HX", standings => updateGroupStandings("jOZ7EYg9HX", standings));
    });

    process.on("SIGINT", () => process.exit());
    process.on("SIGTERM", () => process.exit());
}

main();