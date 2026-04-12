import {BackendiumRouter} from "backendium";
import {array, boolean, file, int, object, optional, ParsingError, string, uuid} from "parsium";
import {checkAuthRetData} from "./authChecker.js";
import {JwtAccessPayload} from "./jwt.js";
import {getUserById, getUserIdByUsername} from "./sql/users.sql.js";
import {putImage} from "./minio/events.js";
import {Readable} from "node:stream"
import {db} from "./sql/index.sql.js";
import {checkAccess, getUserEvents} from "./sql/events.sql.js";
import {sendEventConfirmEmail} from "./mail.js";
import {formFieldsValidator, generateValidator, datetime} from "./parsers.js";

const router = new BackendiumRouter<JwtAccessPayload>();
router.setAuth(async (request, response) => {
    return checkAuthRetData(request.headers?.authorization, response);
});

router.post("/", {
    bodyValidator: object({
        img: file(),
        displayName: string(),
        description: string(),
        showInList: optional(boolean()),
        autoAccept: optional(boolean()),
        opened: optional(boolean()),
        editable: optional(boolean()),
        account: optional(boolean()),
        emailConfirm: optional(boolean()),
        summaryUrl: optional(string()),
        formFields: formFieldsValidator,
        registerStart: optional(datetime()),
        registerEnd: optional(datetime()),
        datetime: optional(datetime())
    }, {ignoreUnknown: false}),
    auth: true
}, async (request, response) => {
    const user = await getUserById(request.globalAuth.id, ["id", "isAdmin"]);
    if (!user) return;
    if (!user.isAdmin) {
        response.status(403);
        response.end();
        return;
    }
    const {img, formFields, ...body} = request.body;
    const id = await db.transaction().execute(async trx => {
        const {id} = await trx.insertInto("events").values({
            ...body,
            imgUrl: await putImage(img.filename ?? "", Readable.from(img.createReadStream())),
            formFields: JSON.stringify(formFields)
        }).returning("id").executeTakeFirstOrThrow();
        await trx.insertInto("eventAdmins").values({user: user.id, event: id}).execute();
        return id;
    });
    response.status(201);
    response.end(id);
});

router.patch("/:id", {
    bodyValidator: object({
        img: optional(file()),
        displayName: optional(string()),
        description: optional(string()),
        showInList: optional(boolean()),
        autoAccept: optional(boolean()),
        opened: optional(boolean()),
        editable: optional(boolean()),
        account: optional(boolean()),
        emailConfirm: optional(boolean()),
        summaryUrl: optional(string()),
        formFields: optional(formFieldsValidator),
        registerStart: optional(datetime()),
        registerEnd: optional(datetime()),
        datetime: optional(datetime())
    }, {ignoreUnknown: false}),
    paramsValidator: object({
        id: uuid()
    }),
    auth: true
}, async (request, response) => {
    if (!(await checkAccess(request.params.id, request.globalAuth.id))) {
        response.status(403);
        response.end();
        return;
    }
    const {img, formFields, ...body} = request.body;
    await db.updateTable("events").set({
        ...body,
        imgUrl: img ? await putImage(img.filename ?? "", Readable.from(img.createReadStream())) : undefined,
        formFields: JSON.stringify(formFields)
    }).where("id", '=', request.params.id).execute();
    response.end();
});

router.patch("/:id/admins", {
    bodyValidator: object({
        add: optional(array(string())),
        remove: optional(array(string()))
    }),
    paramsValidator: object({
        id: uuid()
    }),
    auth: true
}, async (request, response) => {
    if (!(await checkAccess(request.params.id, request.globalAuth.id))) {
        response.status(403);
        response.end();
        return;
    }
    const add = await Promise.all(request.body.add?.map(async username => await getUserIdByUsername(username)) ?? []);
    const remove = await Promise.all(request.body.remove?.map(async username => await getUserIdByUsername(username)) ?? []);
    if (add.includes(undefined) || remove.includes(undefined)) {
        response.status(404);
        response.end();
        return;
    }
    await db.transaction().execute(async trx => {
        await Promise.all(add.map(async id => {
            await trx.insertInto("eventAdmins")
                .values({event: request.params.id, user: id as number})
                .execute();
        }) ?? []);
        await Promise.all(remove.map(async id => {
            await trx.deleteFrom("eventAdmins")
                .where(({eb, and}) => and([eb("user", '=', id as number), eb("event", '=', request.params.id)]))
                .execute();
        }) ?? []);
    });
    response.end();
});

router.get("/", {auth: true}, async (request, response) => {
    response.expressResponse.set("content-type", "application/json");
    response.end(await getUserEvents(request.globalAuth.id));
    console.log(await getUserEvents(request.globalAuth.id));
});

router.get("/list-all", {auth: true}, async (request, response) => {
    const user = await getUserById(request.globalAuth.id, ["id", "isAdmin"]);
    if (!user) return;
    if (!user.isAdmin) {
        response.status(403);
        response.end();
        return;
    }
    response.expressResponse.set("content-type", "application/json");
    response.end(await db.selectFrom("events").selectAll().execute());
});

router.get("/:id", {
    paramsValidator: object({
        id: uuid()
    })
}, async (request, response) => {
    const event = await db.selectFrom("events").where("id", '=', request.params.id)
        .select(["id", "imgUrl", "displayName", "description", "showInList", "opened", "editable", "account", "summaryUrl", "registerStart", "registerEnd", "datetime", "formFields"])
        .executeTakeFirst();
    if (!event) {
        response.status(404);
        response.end();
        return;
    }
    response.expressResponse.set("content-type", "application/json");
    response.end(event);
});

router.get("/:id/form", {
    paramsValidator: object({
        id: uuid()
    })
}, async (request, response) => {
    const event = await db.selectFrom("events").where("id", '=', request.params.id)
        .select(["formFields"])
        .executeTakeFirst();
    if (!event) {
        response.status(404);
        response.end();
        return;
    }
    response.expressResponse.set("content-type", "application/json");
    response.end(event.formFields);
});

router.post("/:id", {
    paramsValidator: object({
        id: uuid()
    }),
    bodyValidator: object({})
}, async (request, response) => {
    const event = await db.selectFrom("events").where("id", '=', request.params.id)
        .select(["id", "account", "autoAccept", "emailConfirm", "displayName", "summaryUrl", "formFields"])
        .executeTakeFirst();
    if (!event) {
        response.status(404);
        response.end();
        return;
    }
    try {
        const formFields = generateValidator(event.formFields)(request.body, "response");

        if (event.account) {
            const auth = await checkAuthRetData(request.expressRequest.headers?.authorization, response);
            if (!auth) return;
            if (
                (await db.selectFrom("eventParticipants")
                    .where(({eb, and}) => and([eb("event", '=', request.params.id), eb("user", '=', auth.id)]))
                    .execute()
                ).length > 0
            ) {
                response.status(409);
                response.end();
                return;
            }
            await db.insertInto("eventParticipants").values({
                user: auth.id,
                event: request.params.id,
                formFields,
                originalFormFields: request.body,
                accepted: event.autoAccept,
                datetime: new Date(),
                editDatetime: new Date()
            }).execute();
        }
        else {
            let auth = undefined;
            if ("authorization" in request.expressRequest.headers) {
                auth = await checkAuthRetData(request.expressRequest.headers?.authorization, response);
                if (!auth) return;
            }
            await db.insertInto("eventParticipants").values({
                user: auth?.id,
                event: request.params.id,
                formFields,
                originalFormFields: request.body,
                accepted: event.autoAccept,
                datetime: new Date(),
                editDatetime: new Date()
            }).execute();
        }
        response.end();
        if (event.emailConfirm && "email" in request.body && typeof request.body.email === "string") {
            await sendEventConfirmEmail(request.body.email, event.displayName, event.summaryUrl,
                // @ts-ignore
                Object.fromEntries(Object.entries(request.body).map(([x, y]) => [event?.formFields[x]?.name as string, y])));
        }
    }
    catch (error) {
        if (error instanceof ParsingError) {
            response.status(400);
            response.end(error.message);
            return;
        }
        throw error;
    }
});

router.get("/:id/responses", {
    paramsValidator: object({
        id: uuid()
    }),
    queryValidator: object({
        limit: int(),
        offset: int()
    }),
    auth: true
}, async (request, response) => {
    if (!(await checkAccess(request.params.id, request.globalAuth.id))) {
        response.status(403);
        response.end();
        return;
    }
    response.expressResponse.set("content-type", "application/json");
    response.end(
        await db.selectFrom("eventParticipants").where("event", '=', request.params.id)
            .limit(request.query.limit).offset(request.query.offset).selectAll().execute()
    );
});

router.get("/:id/my-responses", {
    paramsValidator: object({
        id: uuid()
    }),
    auth: true
}, async (request, response) => {
    response.expressResponse.set("content-type", "application/json");
    response.end(
        await db.selectFrom("eventParticipants")
            .where(({and, eb}) => and([eb("event", '=', request.params.id), eb("user", '=', request.globalAuth.id)]))
            .selectAll().orderBy("editDatetime", "desc").execute()
    );
});

router.patch("/:id/responses/status", {
    paramsValidator: object({
        id: uuid()
    }),
    bodyValidator: object({
        accepted: optional(boolean()),
        rejected: optional(boolean()),
        visited: optional(boolean()),
        responses: array(int())
    }),
    auth: true
}, async (request, response) => {
    if (!(await checkAccess(request.params.id, request.globalAuth.id))) {
        response.status(403);
        response.end();
        return;
    }
    if ((await Promise.all(request.body.responses.map(async id => {
        return (await db.selectFrom("eventParticipants").select("id")
            .where(({and, eb}) => and([eb("event", '=', request.params.id), eb("id", '=', id)]))
            .execute()).length > 0;
    }))).includes(false)) {
        response.status(404);
        response.end();
        return;
    }
    await db.updateTable("eventParticipants").set({accepted: request.body.accepted, rejected: request.body.rejected, visited: request.body.visited})
        .where("id", "in", request.body.responses).execute();
    response.end();
});

router.patch("/:id/response/:rid", {
    paramsValidator: object({
        id: uuid(),
        rid: int()
    }),
    bodyValidator: object({}),
    auth: true
}, async (request, response) => {
    const eventRow = await db.selectFrom("eventParticipants").select(["id", "user", "event"])
        .where(({and, eb}) => and([eb("event", '=', request.params.id), eb("id", '=', request.params.rid)]))
        .executeTakeFirst();
    if (!eventRow) {
        response.status(404);
        response.end();
        return;
    }
    const event = await db.selectFrom("events").where("id", '=', eventRow.event)
        .select(["formFields"]).executeTakeFirstOrThrow();
    if (eventRow.user != request.globalAuth.id && !(await checkAccess(request.params.id, request.globalAuth.id))) {
        response.status(403);
        response.end();
        return;
    }
    try {
        await db.updateTable("eventParticipants").set({formFields: generateValidator(event.formFields)(request.body, "response"), editDatetime: new Date()})
            .where("id", "=", request.params.rid).execute();
        response.end();
    }
    catch (error) {
        if (error instanceof ParsingError) {
            response.status(400);
            response.end(error.message);
            return;
        }
        throw error;
    }
});

router.get("/:id/response/:rid", {
    paramsValidator: object({
        id: uuid(),
        rid: int()
    }),
    bodyValidator: object({}),
    auth: true
}, async (request, response) => {
    const eventRow = await db.selectFrom("eventParticipants").selectAll()
        .where(({and, eb}) => and([eb("event", '=', request.params.id), eb("id", '=', request.params.rid)]))
        .executeTakeFirst();
    if (!eventRow) {
        response.status(404);
        response.end();
        return;
    }
    if (eventRow.user != request.globalAuth.id && !(await checkAccess(request.params.id, request.globalAuth.id))) {
        response.status(403);
        response.end();
        return;
    }
    response.end(eventRow);
});

export default router;