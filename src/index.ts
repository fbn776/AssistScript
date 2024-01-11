import {ArrayTokenizer} from "./utils/ArrayTokenizer";

const inputStr = `hello world "this is a string" 'this is another string' "this is a string with a ' in it" 'this is a string with a " in it'`;

function groupQuotesInStr(str: string): string[] {
    const tokens = new ArrayTokenizer(str.split(' '));
    const quottedTokens: string[] = [];

    while (tokens.hasMoreTokens()) {
        let curr = tokens.nextToken();
        if (curr.startsWith(`"`) || curr.startsWith(`'`)) {
            const startsWith = curr[0];
            let str: string = '';

            while (tokens.hasMoreTokens() &&
                !curr.endsWith(startsWith)) {

                str = str.concat(curr + ' ');
                curr = tokens.nextToken();
            }
            str = str.concat(curr).substring(1, str.length - 1);
            quottedTokens.push(str);
        } else {
            quottedTokens.push(curr);
        }
    }
    return quottedTokens;
}

console.log(groupQuotesInStr(inputStr));
