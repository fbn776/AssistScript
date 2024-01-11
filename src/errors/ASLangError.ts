import ErrorCodes from "./ErrorCodes";

interface ASLangErrorOptions {
    reason: string,
    code?: (string | null),
    position?: number | null,
    fix?: string | null,
    note?: string | null,
    errorCode?: ErrorCodes;
}

/**
 * Represents the base error thrown by the ASLang (AssistScript) interpreter.
 * This is the base class for all errors thrown by the ASLang interpreter.
 * All other errors thrown will extend this class.
 *
 * **NOTE: This does not include errors thrown by the JavaScript runtime**
 */
export default class ASLangError extends Error {
    /** The reason for this error. */
    reason;
    /** The code for this error. */
    code;
    /** The position in the code where this error occurred. */
    position;
    /** The fix for this error, if any. */
    fix;
    /** A note for this error, if any. */
    note
    errorCode;

    constructor(
        {reason, code = null, position = null, fix = null, note = null, errorCode = ErrorCodes.GenericError}: ASLangErrorOptions
    ) {
        super(reason);
        this.reason = reason;
        this.name = "ASLangError";
        this.code = code;
        this.position = position;
        this.fix = fix;
        this.note = note;
        this.errorCode = errorCode;
    }
}