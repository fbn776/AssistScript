import ASBaseError from "./ASBaseError";

/**
 * Represents errors' throw during the make process, like loading up the stdlib, documentations etc.
 * These are errors throws during the compilation process, not the runtime.
 * For e.g., If there is an invalid command name given to a CommandRepresentation, then this will be thrown;
 *
 * These are more like the 'dev' errors and not meant for the end users.
 */
export default class ASMakeError extends ASBaseError {
    constructor(message: string) {
        super(message);
        this.name = 'ASMakeError';
    }
}