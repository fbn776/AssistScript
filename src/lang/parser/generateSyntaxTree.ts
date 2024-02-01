import Stack from "../../utils/Stack";
import LangTokenBase from "../tokens/LangTokenBase";
import {ArrayTokenizer} from "../../utils/ArrayTokenizer";
import {LeftBracketToken, RightBracketToken} from "../tokens/lexmes/ContainerToken";
import CommandToken from "../tokens/lexmes/CommandToken";
import StringToken from "../tokens/lexmes/StringToken";
import {tokenize} from "./tokenize";
import ASLangError from "../errors/ASLangError";
import ErrorCodes from "../errors/ErrorCodes";
import {ParserErrorChecks} from "./ParserErrorChecks";
import preprocessor from "./preprocessor";
import I_BracketTrack = ParserErrorChecks.I_BracketTrack;


/**
 * Takes in a string of text, tokenizes it and then creates the syntax tree and returns a CommandToken as the head.
 *
 * Output e.g.:
 * CommandToken {
 *     name,
 *     params: [
 *         BaseTokens...
 *     ]
 * }
 */
export default function generateSyntaxTree(str: string) {
    const tk = preprocessor(tokenize(str));
    const tokens = new ArrayTokenizer<LangTokenBase>(tk);
    const stack = new Stack<LangTokenBase>();

    // For keeping track of brackets to check for errors.
    const bracketTrack = new Stack<I_BracketTrack>();


    while (tokens.hasMoreTokens()) {
        const token = tokens.nextToken();
        if (token === null)
            continue;

        if (token instanceof LeftBracketToken) {
            stack.push(token);
            bracketTrack.push({value: token.value as string, tokenPos: tokens.currIndex});
        } else if (token instanceof RightBracketToken) {
            let cmd = new CommandToken('', []);
            const tempStack = new Stack<LangTokenBase>();

            while (!stack.isEmpty() && !(stack.peek() instanceof LeftBracketToken)) {
                tempStack.push(stack.pop()!);
            }

            // ERROR Check; If the stack is empty throw;
            ParserErrorChecks.hasRougeRightBracketError_ST(stack, str, tokens, token);

            bracketTrack.pop();
            stack.pop();

            const topCmd = tempStack.pop();
            // ERROR Check: is the command empty?
            ParserErrorChecks.hasEmptyBracketError_ST(topCmd, str, tokens, token);

            // TODO Check if the tempStack's top is a command, if then the `cmd` is an eval command;
            if (!(topCmd instanceof StringToken))
                throw new ASLangError({
                    reason: "This is a TODO; The command name is taken as the first token inside brackets and they must be strings too",
                    errorCode: ErrorCodes.PlaceholderError
                })

            cmd.changeName(topCmd.value as string);
            while (!tempStack.isEmpty()) {
                cmd.appendParam(tempStack.pop()!);
            }
            stack.push(cmd);

        } else {
            stack.push(token);
        }
    }

    // ERROR Check; Are any brackets not closed?
    ParserErrorChecks.hasRougeLeftBracketError_ST(bracketTrack, tokens, str);

    const arr = stack.toArray();
    // TODO Check if the tempStack's top is a command, if then the `cmd` is an eval command;
    const cmd = new CommandToken(arr[0].value as string, [])
    for (let i = 1; i < arr.length; i++) {
        cmd.appendParam(arr[i]);
    }

    return cmd;
}