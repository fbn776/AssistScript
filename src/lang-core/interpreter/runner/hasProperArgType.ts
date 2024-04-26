import LangTokenBase from "../../specs/tokens/LangTokenBase";
import Parameters from "../../specs/lang-units/Parameters";
import DataType from "../../specs/tokens/DataType";
import CommandToken from "../../specs/tokens/lexmes/CommandToken";
import NumberToken from "../../specs/tokens/lexmes/NumberToken";
import BooleanToken from "../../specs/tokens/lexmes/BooleanToken";
import StringToken from "../../specs/tokens/lexmes/StringToken";

type T_ArgCheck = {
    success: boolean,
    foundType?: DataType,
}

/**
 * Utility function that checks if a token provided matches with the rules of Parameter.
 * @param token The token to be checked
 * @param params the Parameter object of a Command
 * @param index the current index of the token
 */
export function hasProperArgType(token: LangTokenBase<unknown>, params: Parameters, index: number): T_ArgCheck {
    let type: DataType;

    /** If the index is greater than param lengths, then assume the remaining types to be the last parameter type*/
    if (index > params.getParamsLen - 1)
        type = params.lastParam;
    else
        type = params.types[index]!;

    if (type === DataType.any)
        return {success: true}

    //If the type required is command but token is not a CommandToken then return false
    if (type === DataType.command && !(token instanceof CommandToken))
        return {
            success: false,
            foundType: type,
        }

    if (token instanceof CommandToken) {
        // TODO
        //type = token.
    }

    if (token instanceof NumberToken && type != DataType.number)
        return {
            success: true,
            foundType: type,
        }

    if (token instanceof BooleanToken && type != DataType.boolean)
        return {
            success: true,
            foundType: type,
        }


    return {
        success: !(token instanceof StringToken && type != DataType.string),
        foundType: type
    }
}