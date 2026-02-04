import {sendRecoveryMail} from "./mail.js";
import {BackendiumRouter} from "backendium";
import {createParser, email, int, object, ParsingError, string} from "parsium";
import cryptoRandomString from "crypto-random-string";
import {getIdByEmail, patchUserPassword, signInById} from "./sql/users.sql.js";
import {rsaKeys} from "./rsa.js";

let router = new BackendiumRouter;

let urlKeys = new Map<string, number>();

router.patch("/recovery/:key", {
    paramsValidator: object({
        key: string()
    }),
    bodyValidator: object({
        password: string(),
        keyId: createParser((key: any, path) => {
            key = int()(key, path);
            if (key >= rsaKeys.length) throw new ParsingError("[${path}] doesn't exists")
            return key;
        })
    })
}, async (request, response) => {
    if (!urlKeys.has(request.params.key)) return;
    await patchUserPassword(urlKeys.get(request.params.key) ?? 0, rsaKeys[request.body.keyId].decrypt(request.body.password).toString());
    const token = await signInById(urlKeys.get(request.params.key) ?? 0);
    urlKeys.delete(request.params.key);
    response.end(token, 200);
});

router.patch("/recovery", {
    bodyValidator: object({
        email: email()
    })
}, async (request, response) => {
    console.log(request);
    let id = await getIdByEmail(request.body.email);
    if (!id) {
        return {code: 404};
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