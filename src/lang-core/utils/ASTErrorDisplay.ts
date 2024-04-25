import CommandToken from "../specs/tokens/lexmes/CommandToken";
import LangTokenBase from "../specs/tokens/LangTokenBase";


function drawVerLine(level: number, sep: string = "  ") {
    let str = '';
    for (let i = 0; i < level; i++)
        str +=  sep;

    return str;
}

export function ASTErrorDisplay(base: LangTokenBase<unknown>, errorAT: string) {
    let str = ''

    function ASTErrorDisplay(base: LangTokenBase<unknown>, level: number = 0, sep: string = "  ") {
        const isError = base.tokenID === errorAT;
        const currSep = sep.repeat(level);

        if (base instanceof CommandToken) {

            str += drawVerLine(level, sep) + (level > 0 ? '├> ' : '└>') + base.value + (isError ? ' <-- Here' : '') + '\n';

            for (let i of base.params) {
                ASTErrorDisplay(i, level + 1, sep);
            }
        } else {
            str += drawVerLine(level, sep) + '├ ' + base.value + (isError ? ' <-- Here' : '') + '\n';
        }
    }

    ASTErrorDisplay(base);
    return str.trim()
}