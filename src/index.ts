import ASLangError from "./lang-core/errors/ASLangError";
import {parser} from "./lang-core/interpreter/parser/parser";

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
    parser("hello jjs'haha' 2 3")
});

test(() => {
    parser("hello (('haha') 2 3")
});