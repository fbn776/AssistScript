// TODO File name should be changed

import {ArrayTokenizer} from "../../utils/ArrayTokenizer";
import Stack from "../../utils/Stack";

/**
 *
 * @param strArr
 */
export default function bracketMatcher(strArr: string[]) {
    const tokens = new ArrayTokenizer<string>(strArr);
    const stack = new Stack<string>();

    const test = [];

    while(tokens.hasMoreTokens()) {
        const token = tokens.nextToken();
        if(token === null)
            continue;

        if(token === "(") {
            stack.push("(");
           //console.log("Found opening bracket");
        } else if(token === ")") {
            //console.log("Right bracket found, trying to group...");
            // Pop from stack until a left bracket is found;
            const arr: string[] = [];

            while(!stack.isEmpty() && stack.peek() !== "(") {
                arr.push(stack.pop()!);
            }

            // Pop the bracket out;
            stack.pop();

            arr.reverse();
            stack.push(JSON.stringify(arr));
            //test.push(arr);
        } else {
            stack.push(token);
            test.push(token);
        }
    }

    stack.display()
    console.log("Test:", test);
}