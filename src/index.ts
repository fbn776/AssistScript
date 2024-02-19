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
    console.log(parser("hello jjs'haha' 2 3"))
});

test(() => {
    console.log(parser("hello (('haha') 2 3"))
});

test(() => {
    console.log(parser("add 10 43 24.234 34+13 true (sub -422 -42.44 +23 false) False True"))
});