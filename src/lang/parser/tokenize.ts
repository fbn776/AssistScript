import {ArrayTokenizer} from "../../utils/ArrayTokenizer";
import ASLangError from "../errors/ASLangError";
import ErrorCodes from "../errors/ErrorCodes";
import LangTokenBase from "./tokens/LangTokenBase";
import StringToken from "./tokens/StringToken";
import ContainerToken, {LeftBracketToken, RightBracketToken} from "./tokens/ContainerToken";
import {TknErrorChecks} from "./TknErrorChecks";


/**
 * Splits a string based on parenthesis and converts each to a token
 */
function tokenizeParens(str: string): LangTokenBase[] {
    return str.split(/([()])/).filter((val) => val).map(e => {
        if(e === ")")
            return new RightBracketToken();
        else if(e === "(")
            return new LeftBracketToken();

        return new StringToken(e);
    });
}


/** Takes in a string and splits it into tokens based on space.
 * Along with tokenizing this also groups quotes together, split all the container tokens `(`, `)` and
 * Check parse error like invalid quotes, invalid brackets, etc.
 * @throws ASLangError
 **/
export function tokenize(inputTxt: string): LangTokenBase[] {
    const tokens = new ArrayTokenizer(inputTxt.split(' '));
    const quottedTokens: LangTokenBase[] = [];

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
            TknErrorChecks.hasUnclosedQuoteError(quoteStartIndex, quoteEndIndex, startsWith, inputTxt, tokens, str);

            const beforeStr = str.substring(0, quoteStartIndex),
                afterStr = str.substring(quoteEndIndex + 1);

            // ERROR Check: If there is anything before or after the quote, then throw an error.
            TknErrorChecks.hasInvalidQuoteError(quoteStartIndex, quoteEndIndex, str, beforeStr, afterStr, inputTxt, tokens);

            // If there is anything before the quote, then add it to the return array and also split for parenthesis.
            if (quoteStartIndex != 0)
                quottedTokens.push(...tokenizeParens(beforeStr));

            // Push the grouped string too
            quottedTokens.push(new StringToken(str.substring(quoteStartIndex + 1, quoteEndIndex)));

            // If there is anything after the quote, add it to the return array and split for parenthesis.
            if (quoteEndIndex != str.length - 1)
                quottedTokens.push(...tokenizeParens(afterStr));
        } else {
            // ERROR Check: If there are invalid brackets
            TknErrorChecks.hasInvalidBracketError(curr, inputTxt, tokens);

            // Split for parenthesis
            quottedTokens.push(...tokenizeParens(curr));
        }
    }
    return quottedTokens;
}