import {getUserById} from "./users.sql.js";
import {db} from "./index.sql.js";

export async function checkAccess(eventId: string, userId: number) {
    if ((await db.selectFrom("events").where("id", '=', eventId).select("id").execute()).length <= 0)
        return false;
    const user = await getUserById(userId, ["id", "isAdmin"]);
    if (!user) return false;
    if (user.isAdmin) return true;
    return (await db.selectFrom("eventAdmins")
        .where(({and, eb}) => and([eb("event", '=', eventId), eb("user", '=', userId)]))
        .execute()).length > 0;
}

export async function getUserEvents(userId: number) {
    return db.with('openEvents', db => db
            .selectFrom('events')
            .selectAll()
            .select(({val}) => [
                val('open').as('type'),
                val(false).as('my'),
                val(3).as('priority')
            ])
            .where('showInList', '=', true)
            .where('opened', '=', true)
        )
        .with('myEvents', db => db
            .selectFrom('events')
            .selectAll()
            .select(({val}) => [
                val('my').as('type'),
                val(true).as('my'),
                val(2).as('priority')
            ])
            .where(({exists, selectFrom}) =>
                exists(
                    selectFrom('eventParticipants')
                        .select('user')
                        .whereRef('event', '=', 'events.id')
                        .where('user', '=', userId)
                )
            )
        )
        .with('adminEvents', db => db
            .selectFrom('events')
            .selectAll()
            .select(({val}) => [
                val('admin').as('type'),
                val(false).as('my'),
                val(1).as('priority')
            ])
            .where(({exists, selectFrom}) =>
                exists(
                    selectFrom('eventAdmins')
                        .select('user')
                        .whereRef('event', '=', 'events.id')
                        .where('user', '=', userId)
                )
            )
        )
        .with('userEvents', db =>
            db.selectFrom('openEvents').selectAll()
                .unionAll(db.selectFrom('myEvents').selectAll())
                .unionAll(db.selectFrom('adminEvents').selectAll())
        )
        .selectFrom('userEvents')
        .select(["id", "imgUrl", "displayName", "description", "showInList", "opened", "editable", "account", "summaryUrl", "type", "registerStart", "registerEnd", "datetime"])
        .select(eb =>
            eb.cast(
                eb.fn
                    .max('my')
                    .over(ob => ob.partitionBy('id')),
                'boolean'
            ).as('my')
        )
        .distinctOn(['id'])
        .orderBy('id')
        .orderBy('priority').execute()
}