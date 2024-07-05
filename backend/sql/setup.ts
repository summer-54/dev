import {db} from "./index.js";

export default async function () {
    try {
        await db.schema.createTable("news")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("datetime", "timestamp", cb => cb.notNull())
            .addColumn("title", "varchar(50)", cb => cb.notNull())
            .addColumn("description", "text", cb => cb.notNull())
            .addColumn("img", "varchar(50)")
            .addColumn("fullText", "text", cb => cb.notNull()).execute();
    } catch (error) {
    }
    try {
        await db.schema.createTable("newsImages")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("newId", "integer", cb => cb.notNull())
            .addColumn("image", "varchar(50)", cb => cb.notNull()).execute();
    } catch (error) {
    }
    try {
        await db.schema.createTable("users")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("username", "varchar(50)", cb => cb.notNull().unique())
            .addColumn("codeforcesHandle", "varchar(50)", cb => cb.notNull().unique())
            .addColumn("firstName", "varchar(50)", cb => cb.notNull())
            .addColumn("lastName", "varchar(50)", cb => cb.notNull())
            .addColumn("passwordHash", "varchar(256)", cb => cb.notNull()).execute();
    } catch (error) {
    }
    try {
        await db.schema.createTable("sessions")
            .addColumn("id", "serial", cb => cb.primaryKey().unique())
            .addColumn("userId", "integer", cb => cb.notNull())
            .addColumn("token", "varchar(512)", cb => cb.notNull()).execute();
    } catch (error) {
    }
}