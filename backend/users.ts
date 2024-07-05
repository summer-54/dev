import {buildHandlers} from "sbackend";
import {compareHash} from "scryptex";
import {
    getUserByToken, getUserByUsername,
    getUserIdByToken,
    isUniqueCodeforcesHandle,
    isUniqueUsername,
    patchUser, patchUserPassword,
    register,
    signIn
} from "./sql/users.js";

export default buildHandlers({
    post: {
        async "/users/register"(request, response) {
            if (typeof request.body !== "object") {
                response.status(400);
                response.end("");
                return;
            }
            if (typeof request.body.username !== "string" || typeof request.body.codeforcesHandle !== "string" ||
                typeof request.body.firstName !== "string" || typeof request.body.lastName !== "string" ||
                typeof request.body.password !== "string") {
                response.status(400);
                response.end("");
                return;
            }
            let {username, codeforcesHandle, firstName, lastName, password} = request.body;
            let token = await register({username, codeforcesHandle, firstName, lastName, password});
            if (!token) {
                response.status(500);
                response.end("");
                return;
            }
            response.status(201);
            response.end(token);
        },
        async "/users/signin"(request, response) {
            if (typeof request.body !== "object") {
                response.status(400);
                response.end("");
                return;
            }
            if (typeof request.body.username !== "string" || typeof request.body.password !== "string") {
                response.status(400);
                response.end("");
                return;
            }
            let {username, password} = request.body;
            let token = await signIn(username, password);
            if (!token) {
                response.status(401);
                response.end("");
                return;
            }
            response.end(token);
        },
        async "/users/is-unique/username"(request, response) {
            if (typeof request.body !== "string") {
                response.status(400);
                response.end("");
                return;
            }
            if (await isUniqueUsername(request.body)) response.end("1");
            else response.end("0");
        },
        async "/users/is-unique/codeforces-handle"(request, response) {
            if (typeof request.body !== "string") {
                response.status(400);
                response.end("");
                return;
            }
            if (await isUniqueCodeforcesHandle(request.body)) response.end("1");
            else response.end("0");
        }
    },
    get: {
        async "/me"(request, response) {
            if (typeof request.headers.authorization !== "string") {
                response.status(401);
                response.end("");
                return;
            }
            let {authorization: token} = request.headers;
            let user = await getUserByToken(token);
            if (!user) {
                response.status(401);
                response.end("");
                return;
            }
            response.end(user);
        },
        async "/users/:username"(request, response) {
            if (typeof request.params.username !== "string") {
                response.status(400);
                response.end("");
                return;
            }
            let user = await getUserByUsername(request.params.username);
            if (!user) {
                response.status(404);
                response.end("");
                return;
            }
            response.end(user);
        }
    },
    patch: {
        async "/me"(request, response) {
            if (typeof request.body !== "object") {
                response.status(400);
                response.end("");
                return;
            }
            if (typeof request.headers.authorization !== "string") {
                response.status(401);
                response.end("");
                return;
            }
            let {authorization: token} = request.headers;
            let id = await getUserIdByToken(token);
            if (!id) {
                response.status(401);
                response.end("");
                return;
            }
            let promises: Array<Promise<any>> = [];
            if (typeof request.body.username === "string") {
                promises.push(patchUser(id, {username: request.body.username}));
            }
            if (typeof request.body.codeforcesHandle === "string") {
                promises.push(patchUser(id, {codeforcesHandle: request.body.codeforcesHandle}));
            }
            if (typeof request.body.firstName === "string") {
                promises.push(patchUser(id, {firstName: request.body.firstName}));
            }
            if (typeof request.body.lastName === "string") {
                promises.push(patchUser(id, {lastName: request.body.lastName}));
            }
            await Promise.all(promises);
            response.end("");
        },
        async "/me/password"(request, response) {
            if (typeof request.body !== "object") {
                response.status(400);
                response.end("");
                return;
            }
            if (typeof request.body.old !== "string" || typeof request.body["new"] !== "string") {
                response.status(400);
                response.end("");
                return;
            }
            let {old: oldPassword, new: newPassword} = request.body;
            if (typeof request.headers.authorization !== "string") {
                response.status(401);
                response.end("");
                return;
            }
            let {authorization: token} = request.headers;
            let user = await getUserByToken(token, ["passwordHash", "id"]);
            if (!user) {
                response.status(401);
                response.end("");
                return;
            }
            let {id, passwordHash} = user;
            if (!compareHash(oldPassword, passwordHash)) {
                response.status(418);
                response.end("");
                return;
            }
            await patchUserPassword(id, newPassword);
            response.end("");
        }
    }
});