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
        let str = this.name + '\n';
        str += `Reason: ${this.reason}\n`;
        str += '\n> ' + this.source + '\n'

        const pos = (this.position || 0) - 1
        str += '  ' + (pos > 0 ? '┌' : '│') + '─'.repeat(pos < 0 ? 0 : pos)  + (pos > 0 ? '┘' : '') + '\n'

        this.errorToken && (str += `  ├ error token: ${String(this.errorToken).trim()}\n`);
        (this.position != undefined) && (str += `  ├ position: ${this.position}\n`);
        this.fix && (str += `  ├ fix: ${this.fix}\n`);
        this.note && (str += `  ├ note: ${this.note}\n`);
        str += `  └ error code: ${this.errorCode}`;
        return str;
    }

    public toString = this.prettify();
}