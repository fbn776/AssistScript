import LangTokenBase from "../../specs/tokens/LangTokenBase";

/**TODO - Currently this doesnt do anything
 * Probably does something like convert 'number' type stuffs to number, 'booleans' to booleans and some other conversions..
 *
 * Takes in the output of `parser()` and does some pre-processing to it.
 */
export default function preprocessor(tokensIn: LangTokenBase[]) {
    return tokensIn;
}