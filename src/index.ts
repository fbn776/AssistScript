import {tokenize} from "./lang/parser/tokenize";
import ASLangError from "./lang/errors/ASLangError";

function test(str: string) {
    try {
        console.log("Testing: ", str);
        const tokens = tokenize(str);
        console.log(tokens);

    } catch (e) {
        if(e instanceof ASLangError)
            console.error(e.display());
        else
            console.error(e);
    }
}

test(`helo(there "how are you" aaa "h haha")`);
test(`Haha this is a simple string`)
