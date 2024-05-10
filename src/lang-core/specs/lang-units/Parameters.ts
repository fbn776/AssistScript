import DataType from "../tokens/DataType";
import ASMakeError from "../../errors/ASMakeError";

/**
 * Represents a parameter to a command
 *
 * ## RULES
 * 1. If no of parameters is negative,
 *    then it means that the command can take variable number of parameters.<br/>
 *    If no of parameters
 *      1. is -1, then the command can take zero to any number of parameters.
 *      2. is -2, then the command can take one to any number of parameters.
 *
 *    At least one parameter type should be specified.
 *    If more than one is provided,
 *    then the type checks for that many arguments will be done,
 *    and for the rest of the arguments the last parameter type provided will be assumed to be its type.
 *
 * 2. If no of parameters is 0, then the commands won't expect any argument.
 *
 * 3. If it is a positive number,
 *    then the command expects that no of parameters of the corresponding type.
 *    If the number of parameter types listed out is less than the number of parameters expected,
 *    then the arguments are checked against the provided ones
 *    and for the rest of them the last parameter type is assumed to be type for the rest of the arguments
 *
 * If any of these fail, an error will be thrown.
 * @throws ASMakeError
 */
export default class Parameters {
    readonly types: DataType[] = [];
    /** The number of parameters*/
    readonly num;

    /** If the command can have variable no of arguments*/
    readonly isVariable: boolean = false;
    /** The last parameter type. Useful for rule 1 and 2*/
    readonly lastParam: DataType;

    /** Gets the number of parameters given*/
    get getParamsLen() {
        return this.types.length;
    }

    /**
     * @param num Number of parameters
     * @param params The parameter types listed out
     */
    constructor(num: number, ...params: DataType[]) {
        if(params.length === 0 && num === -2)
            throw new ASMakeError(`The command expects at least one parameter. But none found.`);

        if(num > -1 && params.length > num)
            throw new ASMakeError(`The command expects ${num} parameter(s), but found more than enough parameters (${params.length})`);

        this.types = params;
        this.num = num;

        if(num <= -1)
            this.isVariable = true;

        this.lastParam = this.types[this.types.length - 1] || DataType.any;
    }
}




