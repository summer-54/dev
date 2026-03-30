import {BackendiumRouter} from "backendium";
import {any, boolean, file, object, string} from "parsium";
import {checkAuthRetData} from "./authChecker.js";
import {JwtAccessPayload} from "./jwt.js";
import {getUserById} from "./sql/users.sql.js";
import {putImage} from "./minio/events.js";
import {Readable} from "node:stream"
import {db} from "./sql/index.sql.js";

const router = new BackendiumRouter<JwtAccessPayload>();
router.setAuth(async (request, response) => {
    return checkAuthRetData(request.headers?.authorization, response);
})

router.post("/", {
    bodyValidator: object({
        img: file(),
        displayName: string(),
        description: string(),
        autoAccept: boolean(),
        formFields: any(),
        showInList: boolean(),
        opened: boolean()
    }),
    auth: true
}, async (request, response) => {
    const user = await getUserById(request.globalAuth.id, ["id", "isAdmin"]);
    const {img, formFields, ...body} = request.body;
    if (!user) return;
    if (!user.isAdmin) {
        response.status(409);
        response.end();
        return;
    }
    const id = await db.transaction().execute(async trx => {
        const {id} = await trx.insertInto("events").values({
            ...body,
            owner: user.id,
            imgUrl: await putImage(img.filename ?? "", Readable.from(img.createReadStream())),
            formFields: formFields as object
        }).returning("id").executeTakeFirstOrThrow();
        await trx.insertInto("eventAdmins").values({user: user.id, event: id}).execute();
        return id;
    });
    response.end(id);
});

export default router;