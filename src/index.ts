import {tokenize} from "./lang/parser/tokenize";
import ASLangError from "./lang/errors/ASLangError";

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

//test(`helo(there "how are you" aaa "h haha")`);
test(`))add ))10(( (add 40 20) ((sub 50 70 (add 50 10))`);
