/** A wrapper class for `Error`
 * Same as the Error class, but represents an error in the AS language
 */
export default class ASBaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}