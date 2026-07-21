import {db} from "./index.sql.js";
import {sql} from "kysely";

export default async function () {
    try {
        await db.schema.createTable("news")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("datetime", "timestamp", cb => cb.notNull())
            .addColumn("title", "varchar(50)", cb => cb.notNull())
            .addColumn("description", "text", cb => cb.notNull())
            .addColumn("img", "varchar(256)")
            .addColumn("fullText", "text", cb => cb.notNull()).execute();
    } catch (error) {}
    try {
        await db.schema.createTable("newsImages")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("newId", "integer", cb => cb.notNull().references("news.id"))
            .addColumn("image", "varchar(256)", cb => cb.notNull()).execute();
    } catch (error) {}
    try {
        await db.schema.createTable("emailConfirmations")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("email", "varchar(256)", cb => cb.notNull())
            .addColumn("code", "varchar(6)", cb => cb.notNull())
            .addColumn("token", "varchar(512)", cb => cb.notNull().unique())
            .addColumn("expires", "timestamp", cb => cb.notNull()).execute();
    } catch (error) {}
    try {
        await db.schema.createTable("users")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("username", "varchar(50)", cb => cb.notNull().unique())
            .addColumn("codeforcesHandle", "varchar(50)")
            .addColumn("codeforcesHandleLowerCase", "varchar(50)")
            .addColumn("firstName", "varchar(50)", cb => cb.notNull())
            .addColumn("lastName", "varchar(50)", cb => cb.notNull())
            .addColumn("email", "varchar(64)", cb => cb.unique().notNull())
            .addColumn("passwordHash", "varchar(256)", cb => cb.notNull())
            .addColumn("isAdmin", "boolean", cb => cb.notNull().defaultTo(false)).execute();
    } catch (error) {}
    try {
        await db.schema.createTable("sessions")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("userId", "integer", cb => cb.notNull().references("users.id"))
            .addColumn("device", "text")
            .addColumn("os", "text")
            .addColumn("browser", "text")
            .addColumn("mobile", "boolean")
            .addColumn("lastRefresh", "timestamp", cb => cb.notNull()).execute();
    } catch (error) {}
    try {
        await db.schema.createTable("contestGroups")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("name", "varchar(512)", cb => cb.notNull())
            .addColumn("link", "varchar(512)", cb => cb.notNull()).execute();
    } catch (error) {}
    try {
        await db.schema.createTable("contests")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("groupId", "varchar(16)")
            .addColumn("name", "varchar(512)", cb => cb.notNull())
            .addColumn("contestId", "integer", cb => cb.notNull())
            .addColumn("available", "boolean", cb => cb.defaultTo(true))
            .addColumn("solutionsPublishDatetime", "timestamp")
            .addColumn("solutionsVideoId", "varchar(64)")
            .addColumn("problemsPdfLink", "varchar(512)").execute();
    } catch (error) {}
    try {
        await db.schema.createTable("officialResults")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("contestId", "integer", cb => cb.notNull().references("contests.id"))
            .addColumn("user", "varchar(64)", cb => cb.notNull())
            .addColumn("result", "integer", cb => cb.notNull())
            .addColumn("datetime", "timestamp", cb => cb.notNull()).execute();
    } catch (error) {}
    try {
        await db.schema.createTable("unofficialResults")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("contestId", "integer", cb => cb.notNull().references("contests.id"))
            .addColumn("user", "varchar(64)", cb => cb.notNull())
            .addColumn("result", "integer", cb => cb.notNull())
            .addColumn("datetime", "timestamp", cb => cb.notNull()).execute();
    } catch (error) {}
    try {
        await db.schema.createTable("usersContests")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("user", "integer", cb => cb.notNull().references("users.id"))
            .addColumn("contest", "integer", cb => cb.notNull().references("contests.id"))
            .addColumn("place", "integer", cb => cb.notNull()).execute();
    } catch (error) {}
    try {
        await db.schema.createTable("problems")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("contest", "integer", cb => cb.notNull().references("contests.id"))
            .addColumn("title", "varchar(512)", cb => cb.notNull())
            .addColumn("pdfLink", "varchar(512)")
            .addColumn("available", "boolean", cb => cb.defaultTo(true)).execute();
    } catch (error) {}
    try {
        await db.schema.createTable("standings")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("contest", "integer", cb => cb.notNull().references("contests.id"))
            .addColumn("user", "integer", cb => cb.notNull().references("users.id"))
            .addColumn("task", "integer", cb => cb.notNull().references("problems.id"))
            .addColumn("status", "integer", cb => cb.notNull())
            .addColumn("available", "boolean", cb => cb.defaultTo(true))
            .addColumn("datetime", "timestamp", cb => cb.notNull())
            .addColumn("notOfficial", "boolean", cb => cb.defaultTo(false)).execute();
    } catch (error) {}
    try {
        await db.schema.createTable("articleRepos")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("repo", "text", cb => cb.notNull().unique())
            .addColumn("user", "integer", cb => cb.notNull().references("users.id"))
            .addColumn("datetime", "timestamp", cb => cb.notNull()).execute();
    } catch (error) {}
    try {
        await db.schema.createTable("articlePermissions")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("article", "integer", cb => cb.notNull().references("articleRepos.id"))
            .addColumn("user", "integer", cb => cb.notNull().references("users.id"))
            .addColumn("read", "boolean", cb => cb.defaultTo(false))
            .addColumn("write", "boolean", cb => cb.defaultTo(false)).execute();
    } catch (error) {}
    try {
        await db.schema.createTable("apps")
            .addColumn("id", "varchar(64)", cb => cb.notNull().primaryKey().unique())
            .addColumn("owner", "integer", cb => cb.notNull().references("users.id"))
            .addColumn("imgUrl", "varchar(256)", cb => cb.notNull())
            .addColumn("displayName", "varchar(128)", cb => cb.notNull())
            .addColumn("description", "varchar(512)", cb => cb.notNull()).execute();
    } catch (error) {}
    // try {
    //     await db.schema.createTable("appMaintainers")
    //         .addColumn("id", "serial", cb => cb.primaryKey().unique())
    //         .addColumn("user", "integer", cb => cb.notNull().references("users.id"))
    //         .addColumn("app", "integer", cb => cb.notNull().references("apps.id")).execute();
    // } catch (error) {}
    // try {
    //     await db.schema.createTable("exposedAppPermissions")
    //         .addColumn("permission", "text", cb => cb.notNull().primaryKey().unique())
    //         .addColumn("parent", "text", cb => cb.references("exposedAppPermissions.permission"))
    //         .addColumn("exposer", "varchar(64)", cb => cb.notNull().references("apps.id"))
    //         .addColumn("danger", "integer", cb => cb.notNull())
    //         .addColumn("imgUrl", "varchar(256)", cb => cb.notNull())
    //         .addColumn("displayName", "varchar(128)", cb => cb.notNull())
    //         .addColumn("description", "varchar(512)", cb => cb.notNull())
    //         .addColumn("type", "varchar(7)", cb => cb.notNull())
    //         .addColumn("defaultValue", "jsonb", cb => cb.notNull())
    //         .addColumn("fullValue", "jsonb", cb => cb.notNull()).execute();
    // } catch (error) {}
    // try {
    //     await db.schema.createTable("requiredAppPermissions")
    //         .addColumn("id", "serial", cb => cb.primaryKey().unique())
    //         .addColumn("permission", "text", cb => cb.notNull().references("exposedAppPermissions.permission"))
    //         .addColumn("app", "varchar(64)", cb => cb.notNull().references("apps.id"))
    //         .addColumn("required", "boolean", cb => cb.notNull()).execute();
    // } catch (error) {}
    // try {
    //     await db.schema.createTable("appPermissions")
    //         .addColumn("id", "serial", cb => cb.primaryKey().unique())
    //         .addColumn("permission", "text", cb => cb.notNull())
    //         .addColumn("reference", "text", cb => cb.notNull().references("exposedAppPermissions.permission"))
    //         .addColumn("app", "varchar(64)", cb => cb.notNull().references("apps.id"))
    //         .addColumn("value", "jsonb", cb => cb.notNull()).execute();
    // } catch (error) {}
    // try {
    //     await db.schema.createTable("exposedPermissions")
    //         .addColumn("permission", "text", cb => cb.notNull().primaryKey().unique())
    //         .addColumn("parent", "text", cb => cb.references("exposedPermissions.permission"))
    //         .addColumn("exposer", "varchar(64)", cb => cb.notNull().references("apps.id"))
    //         .addColumn("danger", "integer", cb => cb.notNull())
    //         .addColumn("imgUrl", "varchar(256)", cb => cb.notNull())
    //         .addColumn("displayName", "varchar(128)", cb => cb.notNull())
    //         .addColumn("description", "varchar(512)", cb => cb.notNull())
    //         .addColumn("type", "varchar(7)", cb => cb.notNull())
    //         .addColumn("defaultValue", "jsonb", cb => cb.notNull())
    //         .addColumn("fullValue", "jsonb", cb => cb.notNull()).execute();
    // } catch (error) {}
    // try {
    //     await db.schema.createTable("permissions")
    //         .addColumn("id", "serial", cb => cb.primaryKey().unique())
    //         .addColumn("permission", "text", cb => cb.notNull())
    //         .addColumn("reference", "text", cb => cb.notNull().references("exposedPermissions.permission"))
    //         .addColumn("user", "integer", cb => cb.notNull().references("users.id"))
    //         .addColumn("value", "jsonb", cb => cb.notNull()).execute();
    // } catch (error) {}
    try {
        await db.schema.createTable("events")
            .addColumn("id", "uuid", cb => cb.notNull().defaultTo(sql`gen_random_uuid()`).primaryKey().unique())
            .addColumn("imgUrl", "varchar(256)", cb => cb.notNull())
            .addColumn("displayName", "varchar(128)", cb => cb.notNull())
            .addColumn("description", "varchar(512)", cb => cb.notNull())
            .addColumn("autoAccept", "boolean", cb => cb.notNull().defaultTo(false))
            .addColumn("showInList", "boolean", cb => cb.notNull().defaultTo(true))
            .addColumn("opened", "boolean", cb => cb.notNull().defaultTo(true))
            .addColumn("editable", "boolean", cb => cb.notNull().defaultTo(true))
            .addColumn("account", "boolean", cb => cb.notNull().defaultTo(true))
            .addColumn("emailConfirm", "boolean", cb => cb.notNull().defaultTo(true))
            .addColumn("summaryUrl", "varchar(256)", cb => cb.notNull().defaultTo(""))
            .addColumn("formFields", "jsonb", cb => cb.notNull().defaultTo("{}"))
            .addColumn("registerStart", "timestamp")
            .addColumn("registerEnd", "timestamp")
            .addColumn("datetime", "timestamp").execute();
    } catch (error) {}
    try {
        await db.schema.createTable("eventAdmins")
            .addColumn("id", "serial", cb => cb.notNull().primaryKey().unique())
            .addColumn("event", "uuid", cb => cb.notNull().references("events.id"))
            .addColumn("user", "integer", cb => cb.notNull().references("users.id")).execute();
    } catch (error) {}
    try {
        await db.schema.createTable("eventParticipants")
            .addColumn("id", "serial", cb => cb.notNull().primaryKey().unique())
            .addColumn("event", "uuid", cb => cb.notNull().references("events.id"))
            .addColumn("user", "integer", cb => cb.references("users.id"))
            .addColumn("formFields", "jsonb", cb => cb.notNull())
            .addColumn("originalFormFields", "jsonb", cb => cb.notNull())
            .addColumn("accepted", "boolean", cb => cb.defaultTo(false))
            .addColumn("rejected", "boolean", cb => cb.defaultTo(false))
            .addColumn("visited", "boolean", cb => cb.defaultTo(false))
            .addColumn("datetime", "timestamp", cb => cb.notNull())
            .addColumn("editDatetime", "timestamp", cb => cb.notNull()).execute();
    } catch (error) {}
}