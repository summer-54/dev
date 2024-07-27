import levenshtein from "damerau-levenshtein";
import {getAllUsers} from "./users.sql.js";

export type SearchUserType = {
  username: string,
  codeforcesHandle: string,
  firstName: string,
  lastName: string,
  usernameLength: number,
  codeforcesHandleLength: number,
  firstNameLength: number,
  lastNameLength: number,
  min: number,
  minStr: "username" | "codeforcesHandle" | "firstName" | "lastName"
}

const min = (...args: any[]) => args.sort()[0];

export function compare(str: string, searchString: string) {
    return str.toLowerCase().includes(searchString.toLowerCase()) ? min(levenshtein(str, searchString).steps, 6 - searchString.length - .5) : levenshtein(str, searchString).steps
}

export async function searchUsers(searchString: string): Promise<Array<SearchUserType>> {
    let arr: Array<SearchUserType> = (await getAllUsers(["username", "codeforcesHandle", "firstName", "lastName"])).map(({username, codeforcesHandle, firstName, lastName}) => ({
        username, codeforcesHandle, firstName, lastName,
        usernameLength: compare(username, searchString),
        codeforcesHandleLength: compare(codeforcesHandle, searchString),
        firstNameLength: compare(firstName, searchString),
        lastNameLength: compare(lastName, searchString)
    })).map(({usernameLength, codeforcesHandleLength, firstNameLength, lastNameLength, ...other}) => ({
        ...other, usernameLength, codeforcesHandleLength, firstNameLength, lastNameLength,
        min: min(usernameLength, codeforcesHandleLength, firstNameLength, lastNameLength),
        minStr: usernameLength <= codeforcesHandleLength && usernameLength <= firstNameLength && usernameLength <= lastNameLength ? "username" :
          codeforcesHandleLength <= firstNameLength && codeforcesHandleLength <= lastNameLength ? "codeforcesHandle" :
          firstNameLength <= lastNameLength ? "firstName" : "lastName"
    }))
    arr.sort(({min: a}, {min: b}) => a - b);
    return arr;
}