import LangTokenBase from "../../specs/tokens/LangTokenBase";
import ContainerToken from "../../specs/tokens/lexmes/ContainerToken";
import NumberToken from "../../specs/tokens/lexmes/NumberToken";

function convertToPossibleType(token: LangTokenBase) {
    if(isNaN(Number(token.value)))
        return new NumberToken(+(token.value as string));

    if(token.value === "true" || token.value === "false")
        return new BooleanToken(token.value === "true");

    return token;
}

/**TODO - Currently this doesnt do anything
 * Probably does something like convert 'number' type stuffs to number, 'booleans' to booleans and some other conversions..
 *
 * Takes in the output of `parser()` and does some pre-processing to it.
 */
export default function preprocessor(tokensIn: LangTokenBase[]) {
    tokensIn = tokensIn.map((token) => {
        if(token instanceof ContainerToken)
            return token;

        return convertToPossibleType(token);
    })
    return tokensIn;
}