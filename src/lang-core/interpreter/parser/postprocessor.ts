import LangTokenBase from "../../specs/tokens/LangTokenBase";
import ContainerToken from "../../specs/tokens/lexmes/ContainerToken";
import {convertToPossibleType} from "../../utils/lang_utils";

/**
 * Takes in the partial parsed output and then does some postprocess to it.
 * Like conversion of base tokens to its matching token type
 */
export default function postprocessor(tokensIn: LangTokenBase<unknown>[]) {
    return tokensIn.map((token) => {
        if(token instanceof ContainerToken)
            return token;

        return convertToPossibleType(token);
    })
}