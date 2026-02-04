import {db, ValueType} from "./index.sql.js";

export async function isPermissionExists(permissionId: string) {
    return (await db
        .selectFrom("exposedPermissions")
        .where("permission", '=', permissionId)
        .select(["defaultValue"])
        .execute()).length > 0;
}

export async function getPermission(userId: number, permissionId: string): Promise<ValueType | undefined> {
    let value = (await db.selectFrom("permissions")
        .where(({and, eb}) => and([eb("user", '=', userId), eb("permission", '=', permissionId)]))
        .select(["value"])
        .executeTakeFirst())?.value;

    if (value === undefined) {
        let {defaultValue, parent, fullValue} = (await db
            .selectFrom("exposedPermissions")
            .where("permission", '=', permissionId)
            .select(["defaultValue", "fullValue", "parent"])
            .executeTakeFirstOrThrow());

        if (!parent) return defaultValue;

        return (await getBooleanPermission(userId, parent)) ? fullValue : defaultValue;
    }

    return value;
}

export async function getStringPermission(userId: number, permissionId: string): Promise<string> {
    let value = await getPermission(userId, permissionId);
    if (typeof value !== "string") throw new Error(`${userId} is not a string.`);
    return value;
}

export async function getBooleanPermission(userId: number, permissionId: string): Promise<boolean> {
    let value = await getPermission(userId, permissionId);
    if (typeof value !== "boolean") throw new Error(`${userId} is not a boolean.`);
    return value;
}

export async function getIntPermission(userId: number, permissionId: string): Promise<number> {
    let value = await getPermission(userId, permissionId);
    if (typeof value !== "number" || !Number.isInteger(value)) throw new Error(`${userId} is not an integer.`);
    return value;
}

export async function getFloatPermission(userId: number, permissionId: string): Promise<number> {
    let value = await getPermission(userId, permissionId);
    if (typeof value !== "number") throw new Error(`${userId} is not a number.`);
    return value;
}