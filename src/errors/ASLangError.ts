import ErrorCodes from "./ErrorCodes";

interface ASLangErrorOptions {
    /** The reason for this error. */
    reason: string,
    /** The code for this error. */
    code?: (string | null),
    /** The position in the code where this error occurred. */
    position?: number | null,
    /** The fix for this error, if any. */
    fix?: string | null,
    /** A note for this error, if any. */
    note?: string | null,
    /** The error code for this error. */
    errorCode?: ErrorCodes;
    /** The token that caused the error. */
    errorToken?: string | null;
}

/**
 * Represents the base error thrown by the ASLang (AssistScript) interpreter.
 * This is the base class for all errors thrown by the ASLang interpreter.
 * All other errors thrown will extend this class.
 *
 * **NOTE: This does not include errors thrown by the JavaScript runtime**
 */
export default class ASLangError extends Error {
    reason;
    code;
    position;
    fix;
    note
    errorCode;
    errorToken;

    constructor(
        {reason, code = null, position = null, fix = null, note = null, errorCode = ErrorCodes.GenericError, errorToken}: ASLangErrorOptions
    ) {
        super(reason);
        this.reason = reason;
        this.name = "ASLangError";
        this.code = code;
        this.position = position;
        this.fix = fix;
        this.note = note;
        this.errorCode = errorCode;
        this.errorToken = errorToken;
    }
}