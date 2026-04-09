import {alternatives, any, array, createParser, float, int, object, optional, ParsingError, string} from "parsium";

export const time = () => string({pattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/});

export const exact = <T>(val: T) => createParser((value, path) => {
    if (val === value) return value;
    throw new ParsingError(`[${path}] is is not ${val}`);
});

export const formFieldValidator = alternatives(
    object({
        title: string(),
        type: exact("text"),
        min: optional(int()),
        max: optional(int()),
        pattern: optional(string()),
        ref: optional(array(any()))
    }),
    object({
        title: string(),
        type: exact("int"),
        min: optional(int()),
        max: optional(int()),
        ref: optional(array(any()))
    }),
    object({
        title: string(),
        type: exact("float"),
        min: optional(float()),
        max: optional(float()),
        ref: optional(array(any()))
    }),
    object({
        title: string(),
        type: exact("date"),
        min: optional(int()),
        max: optional(int()),
        ref: optional(array(any()))
    }),
    object({
        title: string(),
        type: exact("datetime"),
        min: optional(int()),
        max: optional(int()),
        ref: optional(array(any()))
    }),
    object({
        title: string(),
        type: exact("select"),
        variants: array(any()),
        ref: optional(array(any()))
    })
);

export const formFieldsValidator = array(formFieldValidator);

export type FormFieldsType = ReturnType<typeof formFieldsValidator>;