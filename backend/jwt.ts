import jwt from 'jsonwebtoken';
import {db} from "./sql/index.sql.js";

export interface JwtRefreshPayload {
    id: number;
    app: string;
    jti: number;
    r: true;
    iat: number;
}

export interface JwtAccessPayload {
    id: number;
    app: string;
    jti: number;
    iat: number;
    exp: number;
}

export interface JwtAppPayload {
    app: string;
}

export function generateRefreshToken(id: number, jti: number, app: string): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign({
            id, jti, app, r: true
        }, process.env.JWT_SECRET ?? "", {
            algorithm: 'HS256' as const
        }, (err, token) => {
            if (err) return reject(err);
            else if (token) resolve(token);
        });
    });
}

export function generateAccessToken(id: number, jti: number, app: string): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign({
            id, jti, app
        }, process.env.JWT_SECRET ?? "", {
            algorithm: 'HS256' as const,
            expiresIn: '5m'
        }, (err, token) => {
            if (err) return reject(err);
            else if (token) resolve(token);
        });
    });
}

export async function verifyRefreshToken(token: string | undefined | null): Promise<false | JwtRefreshPayload> {
    if (token === undefined || token === null) {
        return false;
    }
    let data = await (new Promise<false | JwtAccessPayload | JwtRefreshPayload>(resolve => {
        jwt.verify(token, process.env.JWT_SECRET ?? "", {algorithms: ['HS256']}, (err, data) => {
            if (err) return resolve(false);
            else if (typeof data === "object") resolve(data as unknown as JwtAccessPayload | JwtRefreshPayload);
        });
    }));
    if (!data || !("id" in data) || !("r" in data) || (await db.selectFrom("sessions").where("id", '=', data.jti).execute()).length === 0) return false;
    return data;
}

export async function verifyAccessToken(token: string | undefined | null): Promise<false | JwtAccessPayload> {
    if (token === undefined || token === null) {
        return false;
    }
    let data = await new Promise<false | JwtAccessPayload | JwtRefreshPayload>(resolve => {
        jwt.verify(token, process.env.JWT_SECRET ?? "", {algorithms: ['HS256']}, (err, data) => {
            if (err) return resolve(false);
            else if (typeof data === "object") resolve(data as unknown as JwtAccessPayload | JwtRefreshPayload);
        });
    });
    if (data === false || !("id" in data) || "r" in data) return false;
    return data;
}

export async function verifyAppToken(token: string | undefined | null): Promise<false | JwtAppPayload> {
    if (token === undefined || token === null) {
        return false;
    }
    let data = await new Promise<false | JwtAppPayload>(resolve => {
        jwt.verify(token, process.env.JWT_SECRET ?? "", {algorithms: ['HS256']}, (err, data) => {
            if (err) return resolve(false);
            else if (typeof data === "object") resolve(data as unknown as JwtAppPayload);
        });
    });
    if (data === false || "id" in data) return false;
    return data;
}