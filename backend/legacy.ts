import {WSResponse} from "websocket-express";
import express from "express";
import {BackendiumRouter} from "backendium";

// @ts-ignore
export interface SBackendRequest extends express.Request {
    body: string | {[key: string]: any};
    stringQuery: {[key: string]: string};
    parsedQuery: {[key: string]: boolean | number | null | undefined | string | object};
    query: {[key: string]: boolean | number | null | undefined | string | object};
    stringHeaders: {[key: string]: string};
    parsedHeaders: {[key: string]: boolean | number | null | undefined | string | object};
    // @ts-ignore
    headers: {[key: string]: boolean | number | null | undefined | string | object};
    stringParams: {[key: string]: string};
    parsedParams: {[key: string]: boolean | number | null | undefined | string | object};
    params: {[key: string]: boolean | number | null | undefined | string | object};
}

// @ts-ignore
export interface SBackendResponse extends express.Response {
    // @ts-ignore
    end(data?: string | object): void;
    sendError(error: any): void;
    onBeforeSend(func: (res: string | object, status: number, end: boolean) => void): void;
    onAfterSend(func: (res: string | object, status: number, end: boolean) => void): void;
    onStatusChange(func: (newStatus: number) => void): void;
    headers: {[key: string]: string | number}
}

export interface SBackendWSResponse extends WSResponse {
    sendError(error: any): void;
    onBeforeSend(func: (res: string | object, status: number, end: boolean) => void): void;
    onAfterSend(func: (res: string | object, status: number, end: boolean) => void): void;
    onStatusChange(func: (newStatus: number) => void): void;
    headers: {[key: string]: string | number}
}

export type HandlerCallbackType = (request: SBackendRequest, response: SBackendResponse, next: () => void) => void;
export type WSHandlerCallbackType = (request: SBackendRequest, response: SBackendWSResponse, next: () => void) => void;

export type HandlersType = {
    post?: {[key: string]: HandlerCallbackType},
    get?: {[key: string]: HandlerCallbackType},
    head?: {[key: string]: HandlerCallbackType},
    put?: {[key: string]: HandlerCallbackType},
    delete?: {[key: string]: HandlerCallbackType},
    options?: {[key: string]: HandlerCallbackType},
    connect?: {[key: string]: HandlerCallbackType},
    patch?: {[key: string]: HandlerCallbackType},
    ws?: {[key: string]: WSHandlerCallbackType},
    websocket?: {[key: string]: WSHandlerCallbackType},
    use?: {[key: string]: HandlerCallbackType},
    // useHttp?: {[key: string]: HandlerCallbackType}
}

export type SBackendMethods = "post" | "get" | "head" | "put" | "delete" | "options" | "connect" | "patch" | "use";

const METHODS: Array<SBackendMethods> = ["post", "get", "head", "put", "delete", "options", "connect", "patch", "use"];

export function requestBodyParser(data: Buffer): string | {[key: string]: any} {
    try {
        return JSON.parse(data.toString());
    }
    catch (e) {
        return data.toString();
    }
}

export function parseObjectTypes(object: {[key: string]: string}): {[key: string]: boolean | number | null | undefined | string | object} {
    if (typeof object !== "object" || object === null) {
        return object;
    }
    let obj: {[key: string]: boolean | number | null | undefined | string | object} = {};
    Object.keys(object).forEach(key => {
        let num = Number(object[key]);
        if (!isNaN(num)) {
            obj[key] = num;
        }
        else {
            try {
                obj[key] = JSON.parse(object[key]);
            }
            catch (err) {
                switch (object[key]) {
                    case "true":
                        obj[key] = true;
                        break;
                    case "false":
                        obj[key] = false;
                        break;
                    case "null":
                        obj[key] = null;
                        break;
                    case "undefined":
                        obj[key] = undefined;
                        break;
                    case "NaN":
                        obj[key] = NaN;
                        break;
                    default:
                        obj[key] = object[key];
                }
            }
        }
    });
    return obj;
}

export function buildHandlers(...handlersArray: Array<HandlersType>): BackendiumRouter {
    let router = new BackendiumRouter();
    handlersArray.forEach(handlers => {
        // Object.entries(handlers).forEach(([method, methodHandlers]: [MethodType, HandlerCallbackType]) => Object.entries(methodHandlers).forEach(([route, handler]) => {
        //     array.push([method, route, handler]);
        // }));
        METHODS.forEach(method => Object.entries(handlers[method] ?? {}).forEach(([route, handler]) => {
            router[method](route, (request, response, app, next) => {
                let end = response.expressResponse.end.bind(response.expressResponse);
                // @ts-ignore
                handler({
                    ...request.expressRequest,
                    body: requestBodyParser(request.body),
                    parsedQuery: parseObjectTypes(request.query),
                    stringQuery: request.query,
                    query: parseObjectTypes(request.query),
                    stringHeaders: JSON.parse(JSON.stringify(request.headers)),
                    parsedHeaders: parseObjectTypes(request.headers),
                    headers: parseObjectTypes(request.headers),
                    stringParams: JSON.parse(JSON.stringify(request.params)),
                    parsedParams: parseObjectTypes(request.params),
                    params: parseObjectTypes(request.params)
                }, {
                    ...response.expressResponse,
                    end: (body: any, encoding: any) => {
                        if (typeof body === "object" && !(body instanceof Buffer || body instanceof ArrayBuffer)) {
                            body = JSON.stringify(body);
                            response.expressResponse.set({
                                "content-type": "application/json"
                            });
                        }
                        return end(body, encoding);
                    },
                    status(code: number) {
                        response.status(code);
                    }
                }, next);
            });
        }));
    });
    return router;
}