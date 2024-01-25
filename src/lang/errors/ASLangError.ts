import ErrorCodes from "./ErrorCodes";

interface ASLangErrorOptions {
    name?: string,
    /** The reason for this error. */
    reason: string,
    /** The source code where the error occurred. */
    source?: string,
    /** The position in the code where this error occurred. */
    position?: number,
    /** The fix for this error, if any. */
    fix?: string,
    /** A note for this error, if any. */
    note?: string,
    /** The error code for this error. */
    errorCode: ErrorCodes;
    /** The token that caused the error. */
    errorToken?: string;
}

/**
 * Represents the base error thrown by the ASLang (AssistScript) interpreter.
 * This is the base class for all errors thrown by the ASLang interpreter.
 * All other errors thrown will extend this class.
 *
 * **NOTE: This does not include errors thrown by the JavaScript runtime**
 */
export default class ASLangError extends Error implements ASLangErrorOptions {

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
    source?: string | undefined;
    position?: number | undefined;
    fix?: string | undefined;
    note?: string | undefined;
    errorCode: ErrorCodes;
    errorToken?: string | undefined;

    public display(): string {
        let str = `${this.name}\n`;
        str += `\tReason: ${this.reason}\n`;
        this.source && (str += `\tSource: ${this.source}\n`);
        this.errorToken && (str += `\tError token: ${this.errorToken}\n`);
        (this.position != undefined) && (str += `\tPosition: ${this.position}\n`);
        this.fix && (str += `\tFix: ${this.fix}\n`);
        this.note && (str += `\tNote: ${this.note}\n`);
        str += `\tError code: ${this.errorCode}`;
        return str;
    }

}