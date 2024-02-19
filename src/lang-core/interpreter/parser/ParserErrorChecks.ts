import {ArrayTokenizer, getJoinedStrLength, getJoinedTknLength} from "../../../utils/ArrayTokenizer";
import {hasOnlyRepeatedChars} from "../../utils/lang_utils";
import ASLangError from "../../errors/ASLangError";
import ErrorCodes from "../../errors/ErrorCodes";
import LangTokenBase from "../../specs/tokens/LangTokenBase";
import {RightBracketToken} from "../../specs/tokens/lexmes/ContainerToken";
import Stack from "../../../utils/Stack";

/**
 * A grouping of common or unnecessarily large error checking codes.
 * Allows the functions calling it to follow single responsibility and also reduces code cluttering
 */
export namespace ParserErrorChecks {
    /** Checks for the tokenizing step**/
    export function hasInvalidQuoteError_TK(quoteStartIndex: number, quoteEndIndex: number, str: string, beforeStr: string, afterStr: string, inputTxt: string, tokens: ArrayTokenizer<string>) {
        if ((quoteStartIndex > 0 || quoteEndIndex < str.length - 1) && (
            // Check if characters before and after the token contains only '(' or ')'
            !(hasOnlyRepeatedChars(beforeStr) && hasOnlyRepeatedChars(afterStr)) || (
                (beforeStr && beforeStr[0] !== '(') ||
                (afterStr && afterStr[0] !== ')')
            )
        )) {
            throw new ASLangError({
                reason: `Error in token \`${str.substring(quoteStartIndex, quoteEndIndex + 1)}\`. Only spaces and delimiting characters are allowed just before or after the quotes.`,
                note: `${beforeStr ? 'Found `' + beforeStr + '` before the token' : ''}; ${afterStr ? 'Found `' + afterStr + '` after the token' : ''}`,
                source: inputTxt,
                position: getJoinedStrLength(tokens, tokens.currIndex, 1) - str.length + quoteStartIndex,
                errorCode: ErrorCodes.InvalidQuotes,
                errorToken: str.substring(quoteStartIndex, quoteEndIndex + 1)
            })
        }
    }

    export function hasUnclosedQuoteError_TK(quoteStartIndex: number, quoteEndIndex: number, startsWith: string, inputTxt: string, tokens: ArrayTokenizer<string>, str: string) {
        if (quoteStartIndex === quoteEndIndex)
            throw new ASLangError({
                reason: `\`${startsWith}\` was found, but not closed.`,
                source: inputTxt,
                position: getJoinedStrLength(tokens, tokens.currIndex, 1) - str.length + quoteStartIndex,
                errorCode: ErrorCodes.UnclosedQuote,
                errorToken: startsWith
            })
    }

    export function hasInvalidBracketError_TK(curr: string, inputTxt: string, tokens: ArrayTokenizer<string>) {
        // Match any '(' (any number of them) from the start.
        const bracketStart = curr.match(/^\(+/);
        // Match any ')' (any number of them) from the end.
        const bracketEnd = curr.match(/\)+$/);

        // Get start index and end index everything between matched bracketStart and bracketEnd
        const startI = bracketStart !== null ? bracketStart[0].length : 0,
              endI = bracketEnd !== null ? bracketEnd.index! : curr.length;

        const str = curr.substring(startI, endI);

        // Check if there are brackets b/w the startI and endI; if yes, they all are invalid; throw error.
        const bracketPos = str.search(/([()])/);
        if (bracketPos !== -1) {
            const char = str[bracketPos];
            throw new ASLangError({
                reason: `Found an invalid character '${char}'. Possibly because brackets cannot appear in-between characters.`,
                errorCode: ErrorCodes.InvalidBracket,
                source: inputTxt,
                position: getJoinedStrLength(tokens, tokens.currIndex, 1) - curr.length + startI + bracketPos,
                errorToken: str,
                fix: `Insert space in-between the bracket`
            });
        }
    }

    /** Checks for the specs tree step**/
    export function hasEmptyBracketError_ST(topCmd: LangTokenBase | undefined, str: string, tokens: ArrayTokenizer<LangTokenBase>, token: RightBracketToken) {
        if (topCmd === undefined) {
            throw new ASLangError({
                reason: `Found empty command '()'`,
                source: str,
                errorToken: '()',
                position: getJoinedTknLength(tokens, tokens.currIndex, 1) - (token.value as string).length - 2,
                errorCode: ErrorCodes.EmptyCommand,
                fix: 'Delete the empty command'
            });
        }
    }

    export function hasRougeRightBracketError_ST(stack: Stack<LangTokenBase>, str: string, tokens: ArrayTokenizer<LangTokenBase>, token: RightBracketToken) {
        if (stack.isEmpty()) {
            throw new ASLangError({
                reason: `Invalid bracket, no opening bracket found`,
                errorCode: ErrorCodes.InvalidBracket,
                source: str,
                position: getJoinedTknLength(tokens, tokens.currIndex, 1) - (token.value as string).length,
                errorToken: ')',
            })
        }
    }

    export interface I_BracketTrack {
        value: string,
        tokenPos: number
    }
    export function hasRougeLeftBracketError_ST(bracketTrack: Stack<I_BracketTrack>, tokens: ArrayTokenizer<LangTokenBase>, str: string) {
        if (!bracketTrack.isEmpty()) {
            let top = bracketTrack.pop()!;
            throw new ASLangError({
                reason: `Invalid bracket, no closing bracket found`,
                position: getJoinedTknLength(tokens, top.tokenPos, 1) - top.value.length,
                source: str,
                errorToken: top.value,
                errorCode: ErrorCodes.InvalidBracket,
            })
        }
    }
}