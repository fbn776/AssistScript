import {tokenize} from "./lang/parser/tokenize";
import ASLangError from "./lang/errors/ASLangError";
import makeSyntaxTree from "./lang/parser/makeSyntaxTree";

function test(str: string) {
    try {
        console.log("\nTesting: ", str);
        const tokens = tokenize(str);
        console.log(tokens);
        // bracketMatcher(tokens);

    } catch (e) {
        if(e instanceof ASLangError)
            console.error(e.display());
        else
            console.error(e);
    }
}

const cmd = makeSyntaxTree(`add 10 30 (sub (add 20 20) 30)`);

console.log(JSON.stringify(cmd));