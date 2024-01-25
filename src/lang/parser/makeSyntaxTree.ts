// TODO File name should be changed

import Stack from "../../utils/Stack";
import LangTokenBase from "../tokens/LangTokenBase";
import {ArrayTokenizer} from "../../utils/ArrayTokenizer";
import {LeftBracketToken, RightBracketToken} from "../tokens/ContainerToken";
import CommandToken from "../tokens/CommandToken";
import StringToken from "../tokens/StringToken";
import {tokenize} from "./tokenize";
import ASLangError from "../errors/ASLangError";
import ErrorCodes from "../errors/ErrorCodes";


interface I_BracketTrack {
    value: string,
    tokenPos: number
}

export function getJoinedTknLength(token: ArrayTokenizer<LangTokenBase>, tokenPos: number, offset = 0): number {
    if(tokenPos > token.length)
        throw new Error(`Token position ${tokenPos} is greater than the length of the token array (${token.length})`)

    let length = 0;
    for (let i = 0; i < tokenPos; i++) {
        length += token.tokens[i].value.length + offset;
    }
    return length - offset;
}


function emptyBracketErrorCheck(topCmd: LangTokenBase | undefined, str: string, tokens: ArrayTokenizer<LangTokenBase>, token: RightBracketToken) {
    if (topCmd === undefined) {
        throw new ASLangError({
            reason: `Found empty command '()'`,
            source: str,
            errorToken: '()',
            position: getJoinedTknLength(tokens, tokens.currIndex, 1) - token.value.length - 2,
            errorCode: ErrorCodes.EmptyCommand,
            fix: 'Delete the empty command'
        });
    }
}

function unopenedBracketErrorCheck(stack: Stack<LangTokenBase>, str: string, tokens: ArrayTokenizer<LangTokenBase>, token: RightBracketToken) {
    if (stack.isEmpty()) {
        throw new ASLangError({
            reason: `Invalid bracket, no opening bracket found`,
            errorCode: ErrorCodes.InvalidBracket,
            source: str,
            position: getJoinedTknLength(tokens, tokens.currIndex, 1) - token.value.length,
            errorToken: ')',
        })
    }
}

function unclosedBracketErrorCheck(bracketTrack: Stack<I_BracketTrack>, tokens: ArrayTokenizer<LangTokenBase>, str: string) {
    if (!bracketTrack.isEmpty()) {
        let top = bracketTrack.pop()!;
        throw new ASLangError({
            reason: `Unclosed bracket found`,
            position: getJoinedTknLength(tokens, top.tokenPos, 1) - top.value.length,
            source: str,
            errorToken: top.value,
            fix: 'Remove the bracket or close the bracket',
            errorCode: ErrorCodes.UnclosedBracket,
        })
    }
}

/**
 *
 */
export default function makeSyntaxTree(str: string) {
    const tk = tokenize(str);
    const tokens = new ArrayTokenizer<LangTokenBase>(tk);
    const stack = new Stack<LangTokenBase>();
    const bracketTrack = new Stack<I_BracketTrack>();


    while (tokens.hasMoreTokens()) {
        const token = tokens.nextToken();
        if (token === null)
            continue;

        if (token instanceof LeftBracketToken) {
            stack.push(token);
            bracketTrack.push({value: token.value, tokenPos: tokens.currIndex});
        } else if (token instanceof RightBracketToken) {
            let cmd = new CommandToken('', []);
            const tempStack = new Stack<LangTokenBase>();

            while (!stack.isEmpty() && !(stack.peek() instanceof LeftBracketToken)) {
                tempStack.push(stack.pop()!);
            }

            // ERROR Check; is the stack empty now?
            // If yes, this means that the above while loop didn't find any left bracket for a right bracket
            unopenedBracketErrorCheck(stack, str, tokens, token);

            bracketTrack.pop();
            stack.pop();

            const topCmd = tempStack.pop();
            // ERROR Check: is the command empty?
            emptyBracketErrorCheck(topCmd, str, tokens, token);

            // TODO Check if the tempStack's top is a command, if then the `cmd` is an eval command;
            if (!(topCmd instanceof StringToken))
                throw new ASLangError({
                    reason: "This is a TODO; The command name is taken as the first token inside brackets and they must be strings too",
                    errorCode: ErrorCodes.PlaceholderError
                })

            cmd.changeName(topCmd.value);
            while (!tempStack.isEmpty()) {
                cmd.appendParam(tempStack.pop()!);
            }
            stack.push(cmd);

        } else {
            stack.push(token);
        }
    }

    // ERROR Check; Are any brackets not closed?
    unclosedBracketErrorCheck(bracketTrack, tokens, str);

    const arr = stack.toArray();
    // TODO Check if the tempStack's top is a command, if then the `cmd` is an eval command;
    const cmd = new CommandToken(arr[0].value, [])
    for (let i = 1; i < arr.length; i++) {
        cmd.appendParam(arr[i]);
    }
    return cmd;
}