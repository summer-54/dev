import {buildHandlers} from "./legacy.js";
import {compareHash} from "scryptex";
import {
    adminUsersPatch, checkUseragent,
    getAllUsers,
    getUserByToken,
    getUserByUsername,
    getUserIdByToken,
    isAdmin,
    isUniqueCodeforcesHandle,
    isUniqueEmail,
    isUniqueUsername,
    makeAdmin,
    patchUser,
    patchUserPassword,
    register,
    signIn,
    signOut
} from "./sql/users.sql.js";
import {searchUsers} from "./sql/search.sql.js";
import {email, object, optional, string} from "parsium";
import {checkAuth} from "./authChecker.js";
import {generateAccessToken, verifyAppToken, verifyRefreshToken} from "./jwt.js";

const router = buildHandlers({
    get: {
        async "/me"(request, response) {
            if (typeof request.headers.authorization !== "string") {
                response.status(401);
                response.end("");
                return;
            }
            let {authorization: token} = request.headers;
            let user = await getUserByToken(token, ["username", "codeforcesHandle", "firstName", "lastName", "isAdmin"]);
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
        },
        async "/users/is-unique/username/:username"(request, response) {
            if (typeof request.params.username !== "string") {
                response.status(400);
                response.end("");
                return;
            }
            if (await isUniqueUsername(request.params.username)) response.end("1");
            else response.end("0");
        },
        async "/users/is-unique/email/:email"(request, response) {
            if (typeof request.params.email !== "string") {
                response.status(400);
                response.end("");
                return;
            }
            if (await isUniqueEmail(request.params.email)) response.end("1");
            else response.end("0");
        },
        async "/users/is-unique/codeforces-handle/:codeforcesHandle"(request, response) {
            if (typeof request.params.codeforcesHandle !== "string") {
                response.status(400);
                response.end("");
                return;
            }
            if (await isUniqueCodeforcesHandle(request.params.codeforcesHandle)) response.end("1");
            else response.end("0");
        },
        async "/search/:username"(request, response) {
            if (typeof request.params.username !== "string") {
                response.status(400);
                response.end();
                return;
            }
            response.end(await searchUsers(request.params.username));
        },
        async "/users"(_, response) {
            response.end(await getAllUsers(["id", "username", "firstName", "lastName", "codeforcesHandle", "isAdmin"]));
        },
        async "/is-admin"(request, response) {
            if (typeof request.headers.authorization !== "string" || !(await isAdmin(request.headers.authorization))) {
                response.end("0");
                return;
            }
            response.end("1");
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
                promises.push(patchUser(id, {codeforcesHandle: request.body.codeforcesHandle, codeforcesHandleLowerCase: request.body.codeforcesHandle.toLowerCase()}));
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
        async "/users"(request, response) {
            if (typeof request.headers.authorization !== "string" || !(await isAdmin(request.headers.authorization))) {
                response.status(401);
                response.end();
                return;
            }
            if (typeof request.body !== "object" || !Array.isArray(request.body)) {
                response.status(400);
                response.end();
                return;
            }
            await adminUsersPatch(request.body);
            response.end();
        },
        async "/admin"(request, response) {
            if (typeof request.headers.authorization !== "string" || !(await isAdmin(request.headers.authorization))) {
                response.status(401);
                response.end();
                return;
            }
            console.log(typeof request.body, request.body);
            if (typeof request.body !== "number") {
                response.status(400);
                response.end();
                return;
            }
            await makeAdmin(request.body);
            response.end();
        }
    }
});

router.post("/users/register", {
    bodyValidator: object({
        username: string(),
        codeforcesHandle: string(),
        firstName: string(),
        lastName: string(),
        email: email(),
        password: string()
    }),
    headersValidator: object({
        "user-agent": string()
    })
}, async (request, response) => {
    if (request.body.username.length < 4 || request.body.password.length < 4) {
        response.status(400);
        response.end("");
        return;
    }
    if (!(await isUniqueUsername(request.body.username))) {
        response.status(409);
        response.end("username");
        return;
    }
    if (!(await isUniqueEmail(request.body.email))) {
        response.status(409);
        response.end("email");
        return;
    }
    if (!(await isUniqueCodeforcesHandle(request.body.codeforcesHandle))) {
        response.status(409);
        response.end("codeforcesHandle");
        return;
    }
    let token = await register(request.body, request.headers["user-agent"], "main");
    if (!token) {
        response.status(500);
        response.end("");
        return;
    }
    response.status(201);
    response.expressResponse.cookie("refreshToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        path: "/api/refresh-token"
    });
    response.end("ok");
});

router.post("/users/signin", {
    bodyValidator: object({
        username: string(),
        password: string()
    }),
    headersValidator: object({
        "user-agent": string()
    })
}, async (request, response) => {
    let token = await signIn(request.body.username, request.body.password, request.headers["user-agent"], "main");
    if (!token) {
        response.status(401);
        response.end("");
        return;
    }
    response.expressResponse.cookie("refreshToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        path: "/api/refresh-token"
    });
    response.expressResponse.cookie("refreshToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        path: "/api/users/signout"
    });
    response.end("ok");
});

router.patch("/me/password", {
    bodyValidator: object({
        old: string(),
        new: string()
    }),
    async authChecker(request, response) {
        return checkAuth(request.headers?.authorization, ["passwordHash", "id"], response);
    }
}, async (request, response) => {
    let {old: oldPassword, new: newPassword} = request.body;
    let {id, passwordHash} = request.auth;
    if (!compareHash(oldPassword, passwordHash)) {
        response.status(418);
        response.end();
        return;
    }
    await patchUserPassword(id, newPassword);
    response.end();
});

router.get("/refresh-token", {
    headersValidator: object({
        "user-agent": string()
    })
}, async (request, response) => {
    const token = request.expressRequest.cookies.refreshToken as string | undefined;
    if (!token) {
        response.status(401);
        response.end();
        return;
    }
    const data = await verifyRefreshToken(token);
    if (!data || !(await checkUseragent(request.headers["user-agent"], data.jti))) {
        response.status(401);
        response.end();
        return;
    }
    response.end(await generateAccessToken(data.id, data.app));
});

router.post("/refresh-token", {
    bodyValidator: string(),
    headersValidator: object({
        "user-agent": string(),
        authorization: optional(string())
    })
}, async (request, response) => {
    const data = await verifyRefreshToken(request.body);
    if (!data || !(await checkUseragent(request.headers["user-agent"], data.jti))) {
        response.status(401);
        response.end();
        return;
    }
    let app = "main";
    if ("authorization" in request.headers) {
        const data = await verifyAppToken(request.headers.authorization);
        if (data === false) {
            response.status(418);
            response.end();
            return;
        }
        app = data.app;
    }
    response.end(await generateAccessToken(data.id, app));
});

router.post("/users/signout", {
    headersValidator: object({
        "user-agent": string()
    })
}, async (request, response) => {
    const token = request.expressRequest.cookies.refreshToken as string | undefined;
    if (!token) {
        response.status(401);
        response.end();
        return;
    }
    const data = await verifyRefreshToken(token);
    if (!data || !(await checkUseragent(request.headers["user-agent"], data.jti))) {
        response.status(401);
        response.end();
        return;
    }
    await signOut(data.jti);
    response.expressResponse.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        path: "/api/refresh-token"
    });
    response.expressResponse.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        path: "/api/users/signout"
    });
    response.end();
});

export default router;