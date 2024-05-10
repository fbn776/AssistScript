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
 * @param inputTkn The command to execute
 * @param context The command store instance
 * @param initial Used for better error reporting.
 * @param lazyEval If the command expects a command and now a value then don't execute it, pass it forward.
 * Contains the original string and the root token
 */
export function runCommand(inputTkn: CommandToken, context: AssistScript, initial: T_InitialState, lazyEval?: boolean): unknown {
    const commandDef = context.store.getCommand(inputTkn.commandName);
    const actualParams = inputTkn.params;
    const defParams = commandDef!.params;

    // Used to keep track of the current execution, for better errors.
    context.contextProvider.currentCommand = inputTkn;
    context.contextProvider.currentState = initial;

    if (!commandDef) {
        throw new ASRuntimeError(`Command '${inputTkn.commandName}' not found.`, {
            state: initial,
            occurredCmd: inputTkn
        });
    }
    // Check if the command got the correct number of arguments
    if (!defParams.isVariable && actualParams.length !== defParams.num) {
        throw new ASRuntimeError(`The command '${inputTkn.commandName}' expects ${defParams.num} arguments, but found ${actualParams.length}.`, {
            state: initial,
            occurredCmd: inputTkn
        });
    }
    // If no of args is -2 (that means at least one should be present) and no arg is found throw error;
    if (defParams.isVariable && defParams.num === -2 && actualParams.length === 0) {
        throw new ASRuntimeError(`The command '${inputTkn.commandName}' expects at least one argument. But none found.`, {
            state: initial,
            occurredCmd: inputTkn
        });
    }

    // Goes through the actual arguments and evaluates it, and then returns an array of final values.
    const finalParam = actualParams.map((token, index) => {
        const checkParams = hasProperArgType(token, defParams, index);
        if (!checkParams.success) {
            throw new ASRuntimeError(`The argument '${token.value}' doesn't match the required type
Required: ${checkParams.foundType}
Found: ${token.type.substring(6).toLowerCase()}`, {
                state: initial,
                occurredCmd: token
            });
        }

        if (token instanceof CommandToken) {
            return runCommand(token, context, initial, checkParams.lazyEval);
        }

        return token.value;
    });

    // If the command is lazyEval, then return a function that will execute the command
    if (lazyEval)
        return () => commandDef.exec(context.contextProvider, ...finalParam)

    return commandDef.exec(context.contextProvider, ...finalParam);
}
