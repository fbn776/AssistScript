import CommandToken from "../specs/tokens/lexmes/CommandToken";
import LangTokenBase from "../specs/tokens/LangTokenBase";

/**
 * Draws a vertical line for the AST display
 * @param level
 * @param sep
 * @constructor
 */
function drawVerLine(level: number, sep: string = "  ") {
    let str = ' ';
    for (let i = 0; i < level; i++)
        str +=  sep;

    return str;
}

/**
 * Takes in a base token (the generated syntax tree) and then displays the AST with the error token highlighted.
 * @param base
 * @param errorAT If this is used to show the error token, then this is the tokenID of the error token.
 * @constructor
 */
export function ASTDisplay(base: LangTokenBase<unknown>, errorAT?: string) {
    let str = ''

    function ASTErrorDisplay(base: LangTokenBase<unknown>, level: number = 0, sep: string = "  ") {
        const isError = base.tokenID === errorAT;
        if (base instanceof CommandToken) {
            str += drawVerLine(level, sep) + (level > 0 ? '├>' : '└> ') + base.value + (isError ? ' <-- Here' : '') + '\n';

            for (let i of base.params)
                ASTErrorDisplay(i, level + 1, sep);

        } else
            str += drawVerLine(level, sep) + '├ ' + base.value + (isError ? ' <-- Here' : '') + '\n';
    }

    ASTErrorDisplay(base);
    return str.trim();
}