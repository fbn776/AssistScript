import LangTokenBase from "../../specs/tokens/LangTokenBase";
import ContainerToken from "../../specs/tokens/lexmes/ContainerToken";
import NumberToken from "../../specs/tokens/lexmes/NumberToken";
import BooleanToken from "../../specs/tokens/lexmes/BooleanToken";

/** Converts a base token to it's matching type token*/
function convertToPossibleType(token: LangTokenBase<unknown>) {
    if(!isNaN(Number(token.value)))
        return new NumberToken(+(token.value as string));

    if(token.value === "true" || token.value === "false")
        return new BooleanToken(token.value === "true");

    return token;
}

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