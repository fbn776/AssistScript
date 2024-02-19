import CommandToken from "./specs/tokens/lexmes/CommandToken";
import LangTokenBase from "./specs/tokens/LangTokenBase";

/** Checks if a string only contains unique characters (may/may not repeat)*/
export function hasOnlyRepeatedChars(str: string) {
    for (let a of str) {
        if (a !== str[0]) return false;
    }
    return true;
}

/** Displays the syntax tree to the console in a formatted way*/
export function displayAST(base: LangTokenBase, level: number = 0, sep: string  = "  ") {
    if (base instanceof CommandToken) {
        console.log(`${sep.repeat(level)}>`, base.commandName);

        for (let i of base.params) {
            displayAST(i, level + 1, sep);
        }
    } else {
        console.log(`${sep.repeat(level)}|`, base.value);
    }
}
