import {db} from "./index.sql.js";

export async function isAppIdUsed(id: string): Promise<boolean> {
    return (await db.selectFrom("apps").where("id", '=', id).select(["id"]).execute()).length > 0;
}