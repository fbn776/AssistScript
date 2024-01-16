import {ArrayTokenizer, getJoinedStrLength} from "../utils/ArrayTokenizer";
import ASLangError from "../errors/ASLangError";
import ErrorCodes from "../errors/ErrorCodes";
import {hasOnlyRepeatedChars, splitParenthesis} from "../utils/utils";


/** Takes in a string and splits it into an array.
 * The split is done with whitespaces and parenthesis.
 * This also groups strings with in quotes as a single element and throws error if there is an issue with grouping.
 *
 * @throws ASLangError
 **/
export function groupQuotesAndSplitTokens(inputTxt: string): string[] {
    const tokens = new ArrayTokenizer(inputTxt.split(' '));
    const quottedTokens: string[] = [];

    // If the input string is empty, then throw an error.
    if (inputTxt === '')
        throw new ASLangError({reason: "Cannot group quotes in an empty string.", errorCode: ErrorCodes.FoundNullToken})

    while (tokens.hasMoreTokens()) {
        let curr = tokens.nextToken() || '';

        // NOTE: DQ = Double Quote, SQ = Single Quote
        const startIndexDQ = curr.indexOf(`"`);
        const startIndexSQ = startIndexDQ === -1 ? curr.indexOf(`'`) : startIndexDQ;

        // Checks if the string starts with a quote, and if so, groups the string together until the next quote.
        if (startIndexDQ !== -1 || startIndexSQ !== -1) {
            // Finds the index of the first quote, and what quote it is.
            const startIndex = startIndexDQ === -1 ? startIndexSQ : startIndexDQ;
            const startsWith: string = startIndexDQ === -1 ? `'` : `"`;
            let str: string = '';

            const initialIndex = tokens.currIndex;
            // Loops through the string until it finds the next quote; the next quote could be anywhere in the string.
            while (tokens.hasMoreTokens() &&
                curr!.indexOf(startsWith, tokens.currIndex === initialIndex ? startIndex + 1 : 0) === -1
                ) {
                str = str.concat(curr + ' ');
                curr = tokens.nextToken() || '';
            }
            // Adds the last token to the string.
            str = str.concat(curr!);

            const quoteStartIndex = str.indexOf(startsWith);
            const quoteEndIndex = str.lastIndexOf(startsWith);

            //ERROR Check: If the quote is not closed, then throw an error.
            if (quoteStartIndex === quoteEndIndex) {
                throw new ASLangError({
                    reason: `\`${startsWith}\` was found, but not closed.`,
                    code: inputTxt,
                    position: getJoinedStrLength(tokens, tokens.currIndex, 1) - str.length + quoteStartIndex,
                    errorCode: ErrorCodes.UnclosedQuote,
                    errorToken: startsWith
                })
            }

            const beforeStr = str.substring(0, quoteStartIndex),
                afterStr = str.substring(quoteEndIndex + 1);
            
            // ERROR Check: If there is anything before or after the quote, then throw an error.
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
                    code: inputTxt,
                    position: getJoinedStrLength(tokens, tokens.currIndex, 1) - str.length + quoteStartIndex,
                    errorCode: ErrorCodes.InvalidQuotes,
                    errorToken: str.substring(quoteStartIndex, quoteEndIndex + 1)
                })
            }

            // If there is anything before the quote, then add it to the return array and also split for parenthesis.
            if (quoteStartIndex != 0)
                quottedTokens.push(...splitParenthesis(beforeStr));

            // Push the grouped string too
            quottedTokens.push(str.substring(quoteStartIndex + 1, quoteEndIndex));

            // If there is anything after the quote, add it to the return array and split for parenthesis.
            if (quoteEndIndex != str.length - 1)
                quottedTokens.push(...splitParenthesis(afterStr));
        } else {
            // Split for parenthesis
            quottedTokens.push(...splitParenthesis(curr));
        }
    }
    return quottedTokens;
}