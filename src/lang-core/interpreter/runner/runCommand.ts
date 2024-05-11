import CommandToken from "../../specs/tokens/lexmes/CommandToken";
import ASRuntimeError from "../../errors/ASRuntimeError";
import {hasProperArgType} from "./hasProperArgType";
import AssistScript from "../../AssistScript";
import LangTokenBase from "../../specs/tokens/LangTokenBase";
import Command from "../../specs/lang-units/Command";
import Parameters from "../../specs/lang-units/Parameters";

export type T_InitialState = {
    rootToken: CommandToken,
    originalStr: string
};

/** The function that actually executes the command.
 * This is extracted out to a separate function, because if a command is lazily evaluated,
 * then this a call to this function is enclosed in an anonymous function, which will be called on demand.
 *
 * For eg:
 ```
 (set i 0)
    (while (TRUE) (
    (print i = (get i) ; i + 1 = (add (get i) 1))
    (incr i)
 )
 ```
 * Previously, the `get i` and `add (get i) 1` would be evaluated immediately,
 * but now it will be evaluated only when the `print` command is executed.
 * And the print will only be executed when the while loop is executed.
 **/
function execCmd(actualParams: LangTokenBase<unknown>[], defParams: Parameters, initial: T_InitialState, context: AssistScript, commandDef: Command) {
    // Goes through the actual arguments and evaluates it, and then returns an array of final values.
    const finalParam = actualParams.map((token, index) => {
        const checkParams = hasProperArgType(token, defParams, index);
        if (!checkParams.success) {
            throw new ASRuntimeError(`The argument '${token.value}' doesn't match the required type\nRequired: ${checkParams.foundType}\nFound: ${token.type.substring(6).toLowerCase()}`, {
                state: initial,
                occurredCmd: token
            });
        }

        if (token instanceof CommandToken) {
            return runCommand(token, context, initial, checkParams.lazyEval);
        }

        return token.value;
    });


    return commandDef.exec(context.contextProvider, ...finalParam);
}

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

    // Used to keep track of the current execution, for better errors.
    context.contextProvider.currentCommand = inputTkn;
    context.contextProvider.currentState = initial;

    if (!commandDef) {
        throw new ASRuntimeError(`Command '${inputTkn.commandName}' not found.`, {
            state: initial,
            occurredCmd: inputTkn
        });
    }

    const actualParams = inputTkn.params;
    const defParams = commandDef.params;

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


    // If the command is lazyEval, then return a function that will execute the command
    if (lazyEval)
        return () => execCmd(actualParams, defParams, initial, context, commandDef);

    return execCmd(actualParams, defParams, initial, context, commandDef);
}
