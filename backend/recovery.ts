import {sendRecoveryMail} from "./mail.js";
import {BackendiumRouter} from "backendium";
import {email, object, string} from "parsium";
import cryptoRandomString from "crypto-random-string";
import {getIdByEmail, patchUserPassword, signInById} from "./sql/users.sql.js";

let router = new BackendiumRouter;

let urlKeys = new Map<string, number>();

router.patch("/recovery/:key", {
    paramsValidator: object({
        key: string()
    }),
    bodyValidator: object({
        password: string()
    }),
    headersValidator: object({
        "user-agent": string()
    })
}, async (request, response) => {
    if (!urlKeys.has(request.params.key)) {
        response.status(401);
        response.end();
        return;
    }
    await patchUserPassword(urlKeys.get(request.params.key) ?? 0, request.body.password);
    const token = await signInById(urlKeys.get(request.params.key) ?? 0, request.headers["user-agent"], "main");
    response.expressResponse.cookie("refreshToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",
        path: "/api/refresh-token"
    });
    response.end();
});

router.patch("/recovery", {
    bodyValidator: object({
        email: email()
    })
}, async (request, response) => {
    let id = await getIdByEmail(request.body.email);
    if (!id) {
        response.status(404);
        response.end();
        return;
    }
    let key = "";
    do {
        key = cryptoRandomString({length: 128, type: 'url-safe'});
    } while (urlKeys.has(key));
    let link = `https://inf54.ru/recovery/${key}`;
    urlKeys.set(key, id);
    setTimeout(() => {
        if (!urlKeys.has(key)) return;
        urlKeys.delete(key);
    }, 1800000)
    await sendRecoveryMail(request.body.email, link);
    response.end();
});

export default router;