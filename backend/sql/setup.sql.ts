import {db} from "./index.sql.js";

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
        await db.schema.createTable("users")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("username", "varchar(50)", cb => cb.notNull().unique())
            .addColumn("codeforcesHandle", "varchar(50)", cb => cb.notNull().unique())
            .addColumn("codeforcesHandleLowerCase", "varchar(50)", cb => cb.notNull().unique())
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
            .addColumn("token", "varchar(1024)", cb => cb.notNull()).execute();
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
}