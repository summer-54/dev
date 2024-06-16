import SBackend from "sbackend";
import handlers from "./handlers.js";
import "dotenv/config";
import {setupEnv} from "./sql/index.js";
import {test} from "./standings.js";

async function main() {
    await setupEnv();

    const app = new SBackend({
        name: "test",
        version: "0.0.0",
        logPath: "./latest.log",
        host: process.env.HOST,
        port: process.env.PORT
    });

    app.addHandlers(handlers);

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
        console.log(await test());
    });
}

main();