import {ArrayTokenizer, getJoinedStrLength} from "../../utils/ArrayTokenizer";
import {hasOnlyRepeatedChars} from "../lang_utils";
import ASLangError from "../errors/ASLangError";
import ErrorCodes from "../errors/ErrorCodes";

/**
 * Tokenizer Error checks;
 * A grouping of common or unnecessarily large error checking codes.
 * Allows the functions calling it to follow single responsibility and also reduces code cluttering
 */
export namespace TknErrorChecks {
    export function hasInvalidQuoteError(quoteStartIndex: number, quoteEndIndex: number, str: string, beforeStr: string, afterStr: string, inputTxt: string, tokens: ArrayTokenizer<string>) {
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

}