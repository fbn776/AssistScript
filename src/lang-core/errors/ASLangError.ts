import ErrorCodes from "./ErrorCodes";
import ASBaseError from "./ASBaseError";

interface ASLangErrorOptions {
    name?: string,
    reason: string,
    source: string,
    position?: number,
    fix?: string,
    note?: string,
    errorCode: ErrorCodes;
    errorToken?: string;
}

/**
 * Represents the base error thrown by the ASLang (AssistScript) interpreter.
 *
 * **NOTE: This does not include errors thrown by the JavaScript runtime**
 */
export default class ASLangError extends ASBaseError implements ASLangErrorOptions {

    constructor(
        {name = "ASLangError", reason, source, position, fix, note, errorCode = ErrorCodes.GenericError, errorToken}: ASLangErrorOptions
    ) {
        super(reason);
        this.reason = reason;
        this.name = name || "ASLangError";
        this.source = source;
        this.position = position;
        this.fix = fix;
        this.note = note;
        this.errorCode = errorCode;
        this.errorToken = errorToken;
    }

    reason: string;
    source: string;
    position?: number | undefined;
    fix?: string | undefined;
    note?: string | undefined;
    errorCode: ErrorCodes;
    errorToken?: string | undefined;


    public prettify(): string {
        const maxLen = 60;
        const padding = 20;

        const pos = (this.position || 0) - 1;
        let effPos = pos;

        let str = this.name + '\n';
        str += `Reason: ${this.reason}\n`;
        let src = String(this.source).trim();

        console.log(src)

        if(src.length > maxLen) {
            let start = pos - padding;
            let end = pos + padding;
            src =  (start > 0 ? '... ' : '') + src.substring(start, end) + (end < src.length ? ' ...' : '');
            effPos = (start > 0) ? padding + (start > 0 ? 4 : 0) : pos;
        }

        str += `\n> ${src}\n`

        str += '  ' + (effPos > 0 ? '┌' : '│') + '─'.repeat(effPos < 0 ? 0 : effPos)  + (effPos > 0 ? '┘' : '') + '\n'

        this.errorToken && (str += `  ├ error token: ${String(this.errorToken).trim()}\n`);
        (this.position != undefined) && (str += `  ├ position: ${this.position}\n`);
        this.fix && (str += `  ├ fix: ${this.fix}\n`);
        this.note && (str += `  ├ note: ${this.note}\n`);
        str += `  └ error code: ${this.errorCode}`;
        return str;
    }

    public toString = this.prettify();
}