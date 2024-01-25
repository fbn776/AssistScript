// TODO File name should be changed

import Stack from "../../utils/Stack";
import LangTokenBase from "./tokens/LangTokenBase";
import {ArrayTokenizer} from "../../utils/ArrayTokenizer";
import {LeftBracketToken, RightBracketToken} from "./tokens/ContainerToken";
import CommandToken from "./tokens/CommandToken";
import StringToken from "./tokens/StringToken";

/**
 *
 */
export default function makeSyntaxTree(tk: LangTokenBase[]) {
    const tokens = new ArrayTokenizer<LangTokenBase>(tk);
    const stack = new Stack<LangTokenBase>();

    while(tokens.hasMoreTokens()) {
        const token = tokens.nextToken();
        if (token === null)
            continue;

        if(token instanceof LeftBracketToken) {
            stack.push(token);
        } else if(token instanceof RightBracketToken) {
            let cmd = new CommandToken('', []);
            const tempStack = new Stack<LangTokenBase>();

            while(!stack.isEmpty() && !(stack.peek() instanceof LeftBracketToken)) {
                tempStack.push(stack.pop()!);
            }
            stack.pop();

            // TODO Check if the tempStack's top is a command, if then the `cmd` is an eval command;
            const name = tempStack.pop();
            if(!(name instanceof StringToken))
                throw new Error();

            cmd.changeName(name.value);
            while(!tempStack.isEmpty()) {
                cmd.appendParam(tempStack.pop()!);
            }
            stack.push(cmd);

        } else {
            stack.push(token);
        }
    }

    const arr = stack.toArray();
    const cmd = new CommandToken(arr[0].value, [])
    for(let i = 1; i < arr.length; i++) {
        cmd.appendParam(arr[i]);
    }
    return cmd;
}