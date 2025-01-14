import {emailValidator, sendRecoveryMail} from "./mail.js";
import {BackendiumRouter} from "backendium";
import {int, object, string, ValidationError} from "checkeasy";
import cryptoRandomString from "crypto-random-string";
import {getIdByEmail, patchUserPassword} from "./sql/users.sql.js";
import {rsaKeys} from "./rsa.js";

let router = new BackendiumRouter;

let urlKeys = new Map<string, number>();

router.patch<{password: string, keyId: number}, {key: string}>("/recovery/:key", async (request) => {
    if (!urlKeys.has(request.params.key)) return;
    await patchUserPassword(urlKeys.get(request.params.key) ?? 0, rsaKeys[request.body.keyId].decrypt(request.body.password).toString());
    urlKeys.delete(request.params.key);
    return {code: 200};
}, {
    paramsValidator: object({
        key: string()
    }),
    bodyValidator: object({
        password: string(),
        keyId(key: any, path): number {
            key = int()(key, path);
            if (key >= rsaKeys.length) throw new ValidationError("[${path}] doesn't exists")
            return key;
        }
    })
});

router.patch<{email: string}>("/recovery", async (request, response) => {
    let id = await getIdByEmail(request.body.email);
    if (!id) {
        return {code: 404};
    }
    let key = "";
    do {
        key = cryptoRandomString({length: 128, type: 'url-safe'});
    } while (urlKeys.has(key));
    let link = `http://176.123.165.201/recovery/${key}`;
    urlKeys.set(key, id);
    setTimeout(() => {
        if (!urlKeys.has(key)) return;
        urlKeys.delete(key);
    }, 1800000)
    await sendRecoveryMail(request.body.email, link);
    response.end();
}, {
    bodyValidator: object({
        email: emailValidator()
    })
});

export default router;