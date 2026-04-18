import {
    alternatives,
    any,
    array, boolean,
    createParser,
    float,
    int,
    object,
    oneOf,
    optional,
    ParsingError,
    string
} from "parsium";

export function parseDate(str: string) {
    const [d,m,y] = str.split(".").map(v => Number(v));
    let date = new Date();
    date.setDate(d);
    date.setMonth(m - 1);
    date.setFullYear(y);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

export const datetime = (options: { min?: Date; max?: Date } = {}) => createParser((value, path) => {
    let date = new Date(string({pattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/})(value, path));

    if (options.min !== undefined && date < options.min) {
        throw new ParsingError(`[${path ?? ""}] is less than the allowed minimum (${options.min})`, [{path, issue: `less than the allowed minimum (${options.min})`, rejectedValue: date.toISOString()}]);
    }
    if (options.max !== undefined && date > options.max) {
        throw new ParsingError(`[${path ?? ""}] is larger than the allowed maximum (${options.max})`, [{path, issue: `larger than the allowed maximum (${options.max})`, rejectedValue: date.toISOString()}]);
    }

    return date;
});

export const date = (options: { min?: Date; max?: Date } = {}) => createParser((value, path) => {
    let val = string({pattern: /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/})(value, path);
    let date = parseDate(val);

    if (options.min !== undefined && date < options.min) {
        throw new ParsingError(`[${path ?? ""}] is less than the allowed minimum (${options.min})`, [{path, issue: `less than the allowed minimum (${options.min.toDateString()})`, rejectedValue: val}]);
    }
    if (options.max !== undefined && date > options.max) {
        throw new ParsingError(`[${path ?? ""}] is larger than the allowed maximum (${options.max})`, [{path, issue: `larger than the allowed maximum (${options.max.toDateString()})`, rejectedValue: val}]);
    }

    return val;
});

export const exact = <T>(val: T) => createParser((value, path) => {
    if (val === value) return val;
    throw new ParsingError(`[${path}] is is not ${val}`);
});

export const formFieldValidator = alternatives(
    object({
        key: string(),
        title: string(),
        type: exact("text" as const),
        min: optional(int()),
        max: optional(int()),
        pattern: optional(string()),
        ref: optional(array(any())),
        optional: optional(boolean())
    }),
    object({
        key: string(),
        title: string(),
        type: exact("int" as const),
        min: optional(int()),
        max: optional(int()),
        ref: optional(array(any())),
        optional: optional(boolean())
    }),
    object({
        key: string(),
        title: string(),
        type: exact("float" as const),
        min: optional(float()),
        max: optional(float()),
        ref: optional(array(any())),
        optional: optional(boolean())
    }),
    object({
        key: string(),
        title: string(),
        type: exact("date" as const),
        min: optional(date()),
        max: optional(date()),
        ref: optional(array(any())),
        optional: optional(boolean())
    }),
    object({
        key: string(),
        title: string(),
        type: exact("datetime" as const),
        min: optional(datetime()),
        max: optional(datetime()),
        ref: optional(array(any())),
        optional: optional(boolean())
    }),
    object({
        key: string(),
        title: string(),
        type: exact("select" as const),
        variants: array(any()),
        ref: optional(array(any())),
        optional: optional(boolean())
    })
);

export const formFieldsValidator = array(formFieldValidator);

export type FormFieldsType = ReturnType<typeof formFieldsValidator>;

export function generateValidator(formFields: FormFieldsType) {
    return object(Object.fromEntries(formFields.map((field) => {
        let parser = any();
        if (field.type == "text") parser = string({min: field.min, max: field.max, pattern: field.pattern ? new RegExp(field.pattern) : undefined});
        if (field.type == "int") parser = int({min: field.min, max: field.max});
        if (field.type == "float") parser = float({min: field.min, max: field.max});
        if (field.type == "date") parser = date({min: field.min ? parseDate(field.min) : undefined, max: field.max ? parseDate(field.max) : undefined});
        if (field.type == "datetime") parser = datetime({min: field.min ? new Date(field.min) : undefined, max: field.max ? new Date(field.max) : undefined});
        if (field.type == "select") parser = oneOf(field.variants);
        if (field.optional) parser = optional(parser);
        return [field.key, parser];
    })), {ignoreUnknown: false});
}