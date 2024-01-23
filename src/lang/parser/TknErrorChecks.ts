import {ArrayTokenizer, getJoinedStrLength} from "../../utils/ArrayTokenizer";
import {hasOnlyRepeatedChars} from "../lang_utils";
import ASLangError from "../errors/ASLangError";
import ErrorCodes from "../errors/ErrorCodes";

/**
 * Tokenizer Error checks;
 * This is a grouping of common or unnecessary large error check codes.
 * This allows the functions calling it follow Single responsibility (As lesser code is needed)
 */
export namespace TknErrorChecks {
    export function hasInvalidQuoteError(quoteStartIndex: number, quoteEndIndex: number, str: string, beforeStr: string, afterStr: string, inputTxt: string, tokens: ArrayTokenizer<string>) {
        if ((quoteStartIndex > 0 || quoteEndIndex < str.length - 1) && (
            // Check if characters before and after the token are '(' or ')'
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

    export function hasUnclosedQuoteError(quoteStartIndex: number, quoteEndIndex: number, startsWith: string, inputTxt: string, tokens: ArrayTokenizer<string>, str: string) {
        if (quoteStartIndex === quoteEndIndex)
            throw new ASLangError({
                reason: `\`${startsWith}\` was found, but not closed.`,
                source: inputTxt,
                position: getJoinedStrLength(tokens, tokens.currIndex, 1) - str.length + quoteStartIndex,
                errorCode: ErrorCodes.UnclosedQuote,
                errorToken: startsWith
            })
    }

    export function hasInvalidBracketError(curr: string, inputTxt: string, tokens: ArrayTokenizer<string>) {
        const bracketPos = curr.search(/([()])/)
        if (bracketPos !== -1) {
            const char = curr[bracketPos];
            throw new ASLangError({
                reason: `Found an invalid quote '${char}', possibly because brackets cannot appear in-between characters and need spaces around them`,
                errorCode: ErrorCodes.InvalidBracket,
                source: inputTxt,
                position: getJoinedStrLength(tokens, tokens.currIndex, 1) - curr.length + bracketPos,
                errorToken: char,
                fix: `Insert space in-between the bracket`
            });
        }
    }
}