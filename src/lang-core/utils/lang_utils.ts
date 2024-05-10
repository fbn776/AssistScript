import LangTokenBase from "../specs/tokens/LangTokenBase";
import NumberToken from "../specs/tokens/lexmes/NumberToken";
import BooleanToken from "../specs/tokens/lexmes/BooleanToken";
import DataType from "../specs/tokens/DataType";

/** Checks if a string only contains unique characters (may/may not repeat)
 * @internal*/
export function hasOnlyRepeatedChars(str: string) {
    for (let a of str) {
        if (a !== str[0]) return false;
    }
    return true;
}

/** Converts a base token to it's matching type token
 * @internal
 * */
export function convertToPossibleType(token: LangTokenBase<unknown>) {
    if (!isNaN(Number(token.value)))
        return new NumberToken(+(token.value as string));

    if (token.value === "true" || token.value === "false")
        return new BooleanToken(token.value === "true");

    return token;
}

/**
 * Takes a value and returns its type as the Datatype enum
 */
export function getRoughType(value: unknown): DataType {
    switch (typeof value) {
        case "string":
            return DataType.string;
        case "number":
            return DataType.number;
        case "boolean":
            return DataType.boolean;
        default:
            return DataType.any;
    }
}

/**
 * Checks if a string is a valid command or variable name.
 *
 * Checks for:
 * - Starts with a letter, underscore
 * - Contains only letters, numbers, underscores and hyphen.
 * - No special symbols or spaces.
 * @param name
 */
export function isNameValid(name: string): boolean {
    return /^(?![0-9-])[\w-]+$/.test(name);
}