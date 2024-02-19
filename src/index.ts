import ASLangError from "./lang-core/errors/ASLangError";
import {tokenize} from "./lang-core/parser/tokenize";

function test(func: () => any) {
    try {
        func();
    } catch (e) {
        if (e instanceof ASLangError)
            console.error(e.display());
        else
            console.error(e);
    }
}

test(() => {
    tokenize("hello jjs'haha' 2 3")
});

test(() => {
    tokenize("hello (('haha') 2 3")
});