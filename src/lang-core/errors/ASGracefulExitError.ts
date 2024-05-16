import ASBaseError from "./ASBaseError";

/**
 * Reprints errors that are not fatal, but just gracefully exits from the program.
 * For example, thrown when the loop limit is exceeded.
 */
export default class ASGracefulExitError extends ASBaseError {
    constructor(message: string) {
        super(message);
        this.name = 'ASGracefulExitError'
    }
    prettify(): string {
        return `Gracefully exited: ${this.message}`;
    }
}