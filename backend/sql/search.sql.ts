import levenshtein from "damerau-levenshtein";
import {getAllUsers} from "./users.sql.js";

const min = (...args: any[]) => args.sort()[0];

export function compare(str: string, searchString: string) {
    return str.toLowerCase().includes(searchString.toLowerCase()) ? min(levenshtein(str, searchString).steps, 6 - searchString.length - .5) : levenshtein(str, searchString).steps
}

export async function searchUsers(searchString: string): Promise<Array<[string, number]>> {
    let result: Array<[number, string]> = (await getAllUsers()).map(username => [compare(username, searchString), username]);
    return result.sort().map(([length, username]) => [username, length]);
}