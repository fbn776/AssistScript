import CommandToken from "../../specs/tokens/lexmes/CommandToken";
import CommandStore from "../CommandStore";
import ASRuntimeError from "../../errors/ASRuntimeError";
import {hasProperArgType} from "./hasProperArgType";

export type T_InitialState = {
    rootToken: CommandToken,
    originalStr: string
};

/**
 * The actual implementation of the runner method.
 * A recursive method that goes through each command and its arguments.
 * Also, responsible for argument type validation
 * @param commandToken The command to execute
 * @param store The command store instance
 * @param initial Used for better error reporting.
 * Contains the original string and the root token
 */
export function runCommand(commandToken: CommandToken, store: CommandStore, initial: T_InitialState): unknown {
    const commandDef = store.getCommand(commandToken.commandName);

    if (!commandDef)
        throw new ASRuntimeError(`Command '${commandToken.commandName}' not found.`, {
            initial: initial,
            occurredAt: commandToken
        });


    const tokenParams = commandToken.params;
    const commandParams = commandDef.params;

    // TODO Make this a proper error;
    if (!commandParams.isVariable && tokenParams.length !== commandParams.num)
        throw new ASRuntimeError(`The command expects ${commandParams.num} arguments, but found ${tokenParams.length}`, {
            initial: initial,
            occurredAt: commandToken
        });


    const paramsCP = tokenParams.map((token, index) => {
        // TODO Make this a proper error;
        if (!hasProperArgType(token, commandParams, index))
            throw new ASRuntimeError(`Token type doesn't match the required type`, {
                initial: initial,
                occurredAt: token
            });

        if (token instanceof CommandToken) {
            return runCommand(token, store, initial);
        }

        return token.value;
    });

    return commandDef.exec(...paramsCP);
}