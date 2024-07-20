import setupDB from "./setup.sql.js";
import {ColumnType, Generated, Kysely, PostgresDialect} from "kysely";
import pg from "pg";

export interface NewsTable {
    id: Generated<number>;
    title: string;
    description: string;
    img?: string;
    fullText: string;
    datetime: ColumnType<Date, Date | string>;
}

export interface NewsImagesTable {
    id: Generated<number>;
    newId: number;
    image: string;
}

export interface UsersTable {
    id: Generated<number>;
    username: string;
    codeforcesHandle: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
}

export interface SessionsTable {
    id: Generated<number>;
    userId: number;
    token: string;
}

export interface ContestsTable {
    id: Generated<number>;
    groupId: string;
    name: string;
    contestId: number;
    available: ColumnType<boolean, boolean | undefined>;
}

export interface TasksTable {
    id: Generated<number>;
    contest: number;
    title: string;
    pdfLink: string;
    available: ColumnType<boolean, boolean | undefined>;
}

export interface StandingsTable {
    id: Generated<number>;
    contest: number;
    user: number;
    task: number;
    status: number;
    available: ColumnType<boolean, boolean | undefined>;
    datetime: ColumnType<Date, Date | string>;
}

export interface Database {
    news: NewsTable;
    newsImages: NewsImagesTable;
    users: UsersTable;
    sessions: SessionsTable;
    contests: ContestsTable;
    tasks: TasksTable;
    standings: StandingsTable;
}

export let pool: pg.Pool, dialect: PostgresDialect, db: Kysely<Database>;

export function connect(host: string, port: number, user: string, password: string, database: string) {
    pool = new pg.Pool({host, port, user, password, database});
    dialect = new PostgresDialect({pool});
    db = new Kysely<Database>({dialect});
}

export async function setup(host: string, port: number, user: string, password: string, database: string) {
    connect(host, port, user, password, database);
    await setupDB();
}

export async function setupEnv() {
    await setup(process.env.DB_HOST ?? "localhost", Number(process.env.DB_PORT ?? 5432), process.env.DB_USER ?? "postgres", process.env.DB_PASSWORD ?? "", process.env.DB_NAME ?? "postgres");
}