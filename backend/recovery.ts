import {emailValidator, sendRecoveryMail} from "./mail.js";
import {BackendiumRouter} from "backendium";
import {object, string} from "checkeasy";
import cryptoRandomString from "crypto-random-string";
import {getIdByEmail} from "./sql/users.sql.js";

let router = new BackendiumRouter;

let urlKeys = new Map<string, number>();

router.patch<Buffer, {key: string}>("/recovery/:key", async (request) => {

}, {
    paramsValidator: object({
        key: string()
    })
});

router.patch<{mail: string}>("/recovery", async (request, response) => {
    let id = await getIdByEmail(request.body.mail);
    if (!id) {
        return {code: 404};
    }
    let key = cryptoRandomString({length: 128, type: 'url-safe'});
    let link = `http://176.123.165.201/recovery/${key}`;
    urlKeys.set(key, id);
    await sendRecoveryMail(request.body.mail, link);
    response.end();
}, {
    bodyValidator: object({
        mail: emailValidator()
    })
});

export default router;