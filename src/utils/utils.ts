/** Checks if a string only contains unique characters (may/may not repeat)*/
export function hasOnlyRepeatedChars(str: string) {
    for(let a of str) {
        if(a !== str[0]) return false;
    }
    return true;
}

/** Splits a string into an array, the split happens when '(' or ')' occurs*/
export function splitParenthesis(str: string): string[] {
    return str.split(/([()])/).filter((val) => val);
}