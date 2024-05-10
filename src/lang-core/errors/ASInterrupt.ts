import ASBaseError from "./ASBaseError";

/**
 * Used to interrupt the execution of a function.
 * Used in loops, continue, break, etc.
 */
export default class ASInterrupt extends ASBaseError {
    constructor(msg: string) {
        super(msg);
        this.name = 'ASInterrupt';
    }
}