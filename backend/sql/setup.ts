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
    } catch (error) {}
}