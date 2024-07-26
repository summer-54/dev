import levenshtein from "damerau-levenshtein";
import {getAllUsers} from "./users.sql.js";

export async function searchUsers(searchString: string): Promise<Array<[string, number]>> {
    let result: Array<[number, string]> = (await getAllUsers()).map(username => [levenshtein(username.toLowerCase(), searchString.toLowerCase()).steps, username]);
    return result.sort().map(([length, username]) => [username, length]);
}