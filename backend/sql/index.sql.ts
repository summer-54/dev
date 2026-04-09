import setupDB from "./setup.sql.js";
import {ColumnType, Generated, Kysely, PostgresDialect} from "kysely";
import pg from "pg";
import {FormFieldsType} from "../parsers.js";

export interface NewsTable {
    id: Generated<number>;
    title: string;
    description: string;
    img?: string;
    fullText: string;
    datetime: ColumnType<Date, Date | string, Date | string>;
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
    codeforcesHandleLowerCase: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    email: string;
    isAdmin: boolean;
}

export interface SessionsTable {
    id: Generated<number>;
    userId: number;
    device?: string;
    os?: string;
    browser?: string;
    mobile?: boolean;
    lastRefresh: ColumnType<Date, Date | string, Date | string>;
}

export interface ContestGroupsTable {
    id: Generated<number>;
    name: string;
    link: string;
}

export interface ContestsTable {
    id: Generated<number>;
    groupId?: string;
    name: string;
    contestId: number;
    available: ColumnType<boolean, boolean | undefined>;
    solutionsPublishDatetime?: ColumnType<Date, Date | string, Date | string>;
    solutionsVideoId?: string;
    problemsPdfLink?: string;
    resultsLink: string;
}

export interface OfficialResultsTable {
    id: Generated<number>;
    contestId: number;
    user: string;
    result: number;
    datetime: ColumnType<Date, Date | string, Date | string>;
}

export interface UnofficialResultsTable {
    id: Generated<number>;
    contestId: number;
    user: string;
    result: number;
    datetime: ColumnType<Date, Date | string, Date | string>;
}

export interface UsersContestsTable {
    id: Generated<number>;
    user: number;
    contest: number;
    place: number;
}

export interface ProblemsTable {
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
    datetime: ColumnType<Date, Date | string, Date | string>;
    notOfficial: ColumnType<boolean, boolean | undefined>;
}

export interface ArticleReposTable {
    id: Generated<number>;
    repo: string;
    user: number;
    datetime: ColumnType<Date, Date | string, Date | string>;
}

export interface ArticlePermissionsTable {
    id: Generated<number>;
    article: number;
    user: number;
    read: boolean;
    write: boolean;
}

export interface AppsTable {
    id: string;
    owner: number;
    imgUrl: string;
    displayName: string;
    description: string;
}

export interface AppMaintainersTable {
    id: Generated<number>;
    user: number;
    app: string;
}

export type ValueType = string | number | boolean;

export interface ExposedAppPermissionsTable {
    permission: string;
    parent: string;
    exposer: string;
    danger: number;
    imgUrl: string;
    displayName: string;
    description: string;
    type: "string" | "boolean" | "int" | "float";
    defaultValue: ValueType;
    fullValue: ValueType;
}

export interface RequiredAppPermissionsTable {
    id: Generated<number>;
    permission: string;
    app: string;
    required: boolean;
}

export interface AppPermissionsTable {
    id: Generated<number>;
    permission: string;
    reference: string;
    app: string;
    value: ValueType;
}

export interface ExposedPermissionsTable {
    permission: string;
    parent: string;
    exposer: string;
    danger: number;
    imgUrl: string;
    displayName: string;
    description: string;
    type: "string" | "boolean" | "int" | "float";
    defaultValue: ValueType;
    fullValue: ValueType;
}

export interface PermissionsTable {
    id: Generated<number>;
    permission: string;
    reference: string;
    user: number;
    value: ValueType;
}

export interface EventsTable {
    id: Generated<string>;
    imgUrl: string;
    displayName: string;
    description: string;
    autoAccept: ColumnType<boolean, boolean | undefined, boolean>;
    showInList: ColumnType<boolean, boolean | undefined, boolean>;
    opened: ColumnType<boolean, boolean | undefined, boolean>;
    editable: ColumnType<boolean, boolean | undefined, boolean>;
    account: ColumnType<boolean, boolean | undefined, boolean>;
    emailConfirm: ColumnType<boolean, boolean | undefined, boolean>;
    summaryUrl: ColumnType<string, string | undefined, string>;
    formFields: ColumnType<FormFieldsType, string, string>;
    registerStart?: ColumnType<Date, Date | string, Date | string>;
    registerEnd?: ColumnType<Date, Date | string, Date | string>;
    datetime?: ColumnType<Date, Date | string, Date | string>;
}

export interface EventAdminsTable {
    id: Generated<number>;
    event: string;
    user: number;
}

export interface EventParticipantsTable {
    id: Generated<number>;
    event: string;
    user?: number;
    formFields: object;
    originalFormFields: object;
    accepted: ColumnType<boolean, boolean | undefined, boolean>;
    rejected: ColumnType<boolean, boolean | undefined, boolean>;
    visited: ColumnType<boolean, boolean | undefined, boolean>;
    datetime: ColumnType<Date, Date | string, Date | string>;
    editDatetime: ColumnType<Date, Date | string, Date | string>;
}

export interface Database {
    news: NewsTable;
    newsImages: NewsImagesTable;
    users: UsersTable;
    sessions: SessionsTable;
    contestGroups: ContestGroupsTable;
    contests: ContestsTable;
    officialResults: OfficialResultsTable;
    unofficialResults: UnofficialResultsTable;
    usersContests: UsersContestsTable;
    problems: ProblemsTable;
    standings: StandingsTable;
    articleRepos: ArticleReposTable;
    articlePermissions: ArticlePermissionsTable;
    apps: AppsTable;
    // appMaintainers: AppMaintainersTable;
    // exposedAppPermissions: ExposedAppPermissionsTable;
    // requiredAppPermissions: RequiredAppPermissionsTable;
    // appPermissions: AppPermissionsTable;
    // exposedPermissions: ExposedPermissionsTable;
    // permissions: PermissionsTable;
    events: EventsTable;
    eventAdmins: EventAdminsTable;
    eventParticipants: EventParticipantsTable;
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