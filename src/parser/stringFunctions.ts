import {ArrayTokenizer} from "../utils/ArrayTokenizer";

/**
 * Takes a string and returns an array of strings split by spaces, but groups strings in quotes together.
 */
export function groupQuotesInStr(str: string): string[] {
    const tokens = new ArrayTokenizer(str.split(' '));
    const quottedTokens: string[] = [];

    while (tokens.hasMoreTokens()) {
        let curr = tokens.nextToken();

        if(curr === null)
            break;

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
                curr!.indexOf(startsWith, tokens.currIndex === initialIndex ? startIndex + 1 : 0) === -1) {
                str = str.concat(curr + ' ');
                curr = tokens.nextToken();
            }
            // Adds the last token to the string.
            str = str.concat(curr!);

            const quoteStartIndex = str.indexOf(startsWith);
            const quoteEndIndex = str.lastIndexOf(startsWith);

            // If there is anything before the quote, then add it to the return array.
            if(quoteStartIndex != 0)
                quottedTokens.push(str.substring(0, quoteStartIndex));

            // Now add the grouped string to the return array. But strip the quotes off.
            quottedTokens.push(str.substring(quoteStartIndex + 1, quoteEndIndex));

            // If there is anything after the quote, then also add it to the return array too.
            if (quoteEndIndex != str.length-1)
                quottedTokens.push(str.substring(quoteEndIndex + 1));
        } else {
            quottedTokens.push(curr);
        }
    }
    return quottedTokens;
}