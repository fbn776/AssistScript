import CommandToken from "../../specs/tokens/lexmes/CommandToken";
import ASRuntimeError from "../../errors/ASRuntimeError";
import {hasProperArgType} from "./hasProperArgType";
import AssistScript from "../../AssistScript";

export type T_InitialState = {
    rootToken: CommandToken,
    originalStr: string
};

/**
 * The actual implementation of the runner method.
 * A recursive method that goes through each command and its arguments.
 * Also, responsible for argument type validation
 * @param commandToken The command to execute
 * @param asInstance The command store instance
 * @param initial Used for better error reporting.
 * Contains the original string and the root token
 */
export function runCommand(commandToken: CommandToken, asInstance: AssistScript, initial: T_InitialState): unknown {
    const commandDef = asInstance.store.getCommand(commandToken.commandName);

    // Used to keep track of the current execution, for better errors.
    asInstance.contextProvider.currentCommand = commandToken;
    asInstance.contextProvider.currentState = initial;

    if (!commandDef)
        throw new ASRuntimeError(`Command '${commandToken.commandName}' not found.`, {
            state: initial,
            occurredCmd: commandToken
        });

    const tokenParams = commandToken.params;
    const commandParams = commandDef.params;

    // Check if the command got the correct number of arguments
    if (!commandParams.isVariable && tokenParams.length !== commandParams.num)
        throw new ASRuntimeError(`The command '${commandToken.commandName}' expects ${commandParams.num} arguments, but found ${tokenParams.length}.`, {
            state: initial,
            occurredCmd: commandToken
        });

    // If no of args is -2 (that means at least one should be present) and no arg is found throw error;
    if(commandParams.isVariable && commandParams.num === -2 && tokenParams.length === 0)
        throw new ASRuntimeError(`The command '${commandToken.commandName}' expects at least one argument. But none found.`, {
            state: initial,
            occurredCmd: commandToken
        });

    const paramsCP = tokenParams.map((token, index) => {
        const checkParam = hasProperArgType(token, commandParams, index);
        if (!checkParam.success)
            throw new ASRuntimeError(`The argument '${token.value}' doesn't match the required type
Required: ${checkParam.foundType}
Found: ${token.type.substring(6).toLowerCase()}`, {
                state: initial,
                occurredCmd: token
            });

        if (token instanceof CommandToken) {
            return runCommand(token, asInstance, initial);
        }

        return token.value;
    });

    return commandDef.exec(asInstance.contextProvider, ...paramsCP);
}