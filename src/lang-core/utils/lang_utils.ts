import CommandToken from "../specs/tokens/lexmes/CommandToken";
import LangTokenBase from "../specs/tokens/LangTokenBase";
import NumberToken from "../specs/tokens/lexmes/NumberToken";
import BooleanToken from "../specs/tokens/lexmes/BooleanToken";

/** Checks if a string only contains unique characters (may/may not repeat)*/
export function hasOnlyRepeatedChars(str: string) {
    for (let a of str) {
        if (a !== str[0]) return false;
    }
    return true;
}

/** Displays the syntax tree to the console in a formatted way*/
export function displayAST(base: LangTokenBase<unknown>, level: number = 0, sep: string  = "  ") {
    if (base instanceof CommandToken) {
        console.log(`${sep.repeat(level)}+`, base.commandName);

        for (let i of base.params) {
            displayAST(i, level + 1, sep);
        }
    } else {
        console.log(`${sep.repeat(level)}|`, base.value);
    }
}


/** Converts a base token to it's matching type token*/
export function convertToPossibleType(token: LangTokenBase<unknown>) {
    if (!isNaN(Number(token.value)))
        return new NumberToken(+(token.value as string));

    if (token.value === "true" || token.value === "false")
        return new BooleanToken(token.value === "true");

    return token;
}