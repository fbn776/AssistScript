import CommandStore from "../CommandStore";
import generateSyntaxTree from "../parser/generateSyntaxTree";
import CommandToken from "../../specs/tokens/lexmes/CommandToken";
import ASRuntimeError from "../../errors/ASRuntimeError";
import LangTokenBase from "../../specs/tokens/LangTokenBase";
import DataType from "../../specs/tokens/DataType";
import NumberToken from "../../specs/tokens/lexmes/NumberToken";
import BooleanToken from "../../specs/tokens/lexmes/BooleanToken";
import StringToken from "../../specs/tokens/lexmes/StringToken";
import Parameters from "../../specs/lang-units/Parameters";

export default class Runner {
    private _store = CommandStore.getInstance();

    public run(str: string) {
        const ast = generateSyntaxTree(str);
        return runCommand(ast, this._store);
    }
}

function runCommand(commandToken: CommandToken, store: CommandStore, ): unknown {
    const commandDef = store.getCommand(commandToken.commandName);
    if (!commandDef)
        throw new ASRuntimeError(`Command '${commandToken.commandName}' not found.`);

    const tokenParams = commandToken.params;
    const commandParams = commandDef.params;

    // TODO Make this a proper error;
    if(!commandParams.isVariable && tokenParams.length < commandParams.num) {
        throw new ASRuntimeError(`The command expects ${commandParams.num} arguments, but found ${tokenParams.length}`);
    }

    const paramsCP = tokenParams.map((token, index) => {
        // TODO Make this a proper error;
        if(!hasProperArgType(token, commandParams, index))
            throw new ASRuntimeError(`Token type doesn't match the required type`);
        
        if (token instanceof CommandToken) {
            return runCommand(token, store);
        }

        return token.value;
    });

    return commandDef.exec(...paramsCP);
}

/**
 * Utility function that checks if a token provided matches with the rules of Parameter.
 * @param token The token to be checked
 * @param params the Parameter object of a Command
 * @param index the current index of the token
 */
function hasProperArgType(token: LangTokenBase<unknown>, params: Parameters, index: number) {
    let type: DataType;

    /** If the index is greater than param lengths, the assume the remaining types to be the last parameter type*/
    if(index > params.getParamsLen - 1)
        type = params.lastParam;
    else
        type = params.types[index];

    if(type === DataType.any)
        return true;

    if(token instanceof NumberToken && type != DataType.number)
        return false;

    if(token instanceof BooleanToken && type != DataType.boolean)
        return false;

    if(token instanceof CommandToken && type != DataType.command)
        return false;

    return !(token instanceof StringToken && type != DataType.string);
}