import CommandToken from "../../specs/tokens/lexmes/CommandToken";
import CommandStore from "../CommandStore";
import ASRuntimeError from "../../errors/ASRuntimeError";
import {hasProperArgType} from "./hasProperArgType";
import AssistScript from "../../../AssistScript";
import BaseContextProvider from "../../BaseContextProvider";

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
export function runCommand<T extends BaseContextProvider>(commandToken: CommandToken, asInstance: AssistScript<T>, initial: T_InitialState): unknown {
    const commandDef = asInstance.store.getCommand(commandToken.commandName);

    if (!commandDef)
        throw new ASRuntimeError(`Command '${commandToken.commandName}' not found.`, {
            initial: initial,
            occurredAt: commandToken
        });

    const tokenParams = commandToken.params;
    const commandParams = commandDef.params;

    // TODO Make this a proper error;
    if (!commandParams.isVariable && tokenParams.length !== commandParams.num)
        throw new ASRuntimeError(`The command '${commandToken.commandName}' expects ${commandParams.num} arguments, but found ${tokenParams.length}.`, {
            initial: initial,
            occurredAt: commandToken
        });


    const paramsCP = tokenParams.map((token, index) => {
        const checkParam = hasProperArgType(token, commandParams, index);
        // TODO Make this a proper error;
        if (!checkParam.success)
            throw new ASRuntimeError(`The argument '${token.value}' doesn't match the required type
Required: ${checkParam.foundType}
Found: ${token.type.substring(6).toLowerCase()}`, {
                initial: initial,
                occurredAt: token
            });

        if (token instanceof CommandToken) {
            return runCommand(token, asInstance, initial);
        }

        return token.value;
    });

    return commandDef.exec(asInstance.contextProvider, ...paramsCP);
}